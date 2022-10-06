//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.13;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./dai.sol";
import "./enetScoreConsumerV004.sol";

contract superBetContract is EnetscoresConsumer{
    address tokenAddress;

    enum betOption {
        home,
        away,
        tied
    }
    struct betStruct {
        betOption option;
        uint256 amount;
        uint odd;
        bool alreadyBet;
        bool rewardClaimed;
    }

    struct matchStruct {
        uint homeOdd;
        uint tiedOdd;
        uint awayOdd;
        bool betOpen;
        uint homeTotalBets;
        uint tiedTotalBets;
        uint awayTotalBets;
        betOption winner;
        mapping (address => betStruct) userBets;
        bool winnerResolved;
    }
    mapping(uint32 => matchStruct ) public matchs;

    constructor(address _tokenAddress) {
        owner = msg.sender;
        tokenAddress =_tokenAddress;
    }

    function withdrawDAI(uint amount) public onlyOwner{
        IERC20(tokenAddress).transfer(msg.sender, amount);
    }
    
    event betCreated(uint32 gameId, uint40 startTime, string homeTeam, string awayTeam, uint256 leagueId, uint _homeOdd, uint _tiedOdd,  uint _awayOdd);
    function createBet(bytes32 _requestId, uint256 _idx, uint _homeOdd, uint _tiedOdd,  uint _awayOdd, uint256 leagueId) 
        public onlyOwner{
            GameCreate memory matchData;
            matchData = getGameCreate(_requestId, _idx);
            //Obtengo el GameId para el partido especifico
            uint32 gameId = matchData.gameId;
            //Seteo los premios
            matchs[gameId].homeOdd = _homeOdd;
            matchs[gameId].tiedOdd = _tiedOdd;
            matchs[gameId].awayOdd = _awayOdd;
            matchs[gameId].betOpen = true;
            //Variables temporables para generar el evento
            string memory homeTeam = matchData.homeTeam;
            string memory awayTeam = matchData.awayTeam;
            uint40 startTime = matchData.startTime;
            emit betCreated(gameId, startTime, homeTeam, awayTeam, leagueId, _homeOdd, _tiedOdd, _awayOdd);
    }

    event userBet(address indexed from, uint32 gameId, uint amount, betOption choice, uint odd );
    function setBet(uint32 _gameId, uint _amount, betOption _choice) public {
        require (matchs[_gameId].betOpen == true, "bet closed");
        require (matchs[_gameId].userBets[msg.sender].alreadyBet == false, "you have already bet");
        if(_choice == betOption.home){
        matchs[_gameId].userBets[msg.sender].odd = matchs[_gameId].homeOdd;
        matchs[_gameId].homeTotalBets += _amount;
        }
        if(_choice == betOption.away){
        matchs[_gameId].userBets[msg.sender].odd = matchs[_gameId].awayOdd;
        matchs[_gameId].awayTotalBets += _amount;
        }
        if(_choice == betOption.tied){
        matchs[_gameId].userBets[msg.sender].odd = matchs[_gameId].tiedOdd;
        matchs[_gameId].tiedTotalBets += _amount;
        }
        matchs[_gameId].userBets[msg.sender].option = _choice;
        matchs[_gameId].userBets[msg.sender].amount += _amount;
        matchs[_gameId].userBets[msg.sender].alreadyBet = true;
        depositDAI(_amount);
        emit userBet(msg.sender, _gameId, _amount, _choice,  matchs[_gameId].userBets[msg.sender].odd);
    }

    event betClosed(uint32 gameId);
    function closeBet(uint32 _gameId) public onlyOwner {
            matchs[_gameId].betOpen = false;
            emit betClosed(_gameId);
    }


//Previo a esta funcion llamar getGameResolve pasando como parametro el gameId.
    event matchResolved(uint32 gameId, uint8 homeScore,  uint8 awayScore,  string status, betOption winner);
    function resolveWinner(uint32 _gameId, bytes32 _requestIdGameResolve ) public onlyOwner {
        GameResolve memory matchData;
        matchData = getGameResolve(_requestIdGameResolve, 0);
        uint32 gameId = matchData.gameId;
        //El gameId para el cual se quiere obtener el ganador debe correspondese con el requestId de Game Resolve        
        require(gameId == _gameId, "gameIds not matchs");
        // Verifica que este cerrada la apuesta
        require (matchs[_gameId].betOpen == false, "bet not closed yet");
        // Verifica que el partido haya terminado
        require (keccak256(abi.encodePacked("finished")) == keccak256(abi.encodePacked(matchData.status)));
        // Setea el ganador en base a resultados
        if(matchData.homeScore>matchData.awayScore) {
            matchs[gameId].winner = betOption.home;
        } 
        if(matchData.homeScore<matchData.awayScore) {
            matchs[gameId].winner = betOption.away;
        }
        if(matchData.homeScore == matchData.awayScore) {
            matchs[gameId].winner = betOption.tied;
        }
        matchs[gameId].winnerResolved = true;

        emit matchResolved(gameId, matchData.homeScore,  matchData.awayScore,  matchData.status, matchs[gameId].winner);

    }

    event rewardClaimed(address indexed from, uint32 gameId, uint amount);
    function claimRewards(uint32 _gameId) public {
        require (matchs[_gameId].winnerResolved == true, "Winner not resolved");
        require (matchs[_gameId].winner == matchs[_gameId].userBets[msg.sender].option, "No rewards");
        require (matchs[_gameId].userBets[msg.sender].rewardClaimed == false, "rewards already claimed");
       //Calculo del reward
        uint amount = matchs[_gameId].userBets[msg.sender].amount * matchs[_gameId].userBets[msg.sender].odd / 10**18; //1 eth     
        require(amount<=IERC20(tokenAddress).balanceOf(address(this)), "Not enought balance in treasury");
        matchs[_gameId].userBets[msg.sender].rewardClaimed=true;
        IERC20(tokenAddress).transfer(msg.sender, amount);
        emit rewardClaimed(msg.sender, _gameId, amount);
    }

   function depositDAI(uint amount) public {
        IERC20(tokenAddress).transferFrom(
            msg.sender,
            address(this),
            amount
        );
    }

//FUNCIONES PUBLIC VIEW PARA CONTROL

    function getUserBet(uint32 _gameId) public view returns (betStruct memory) {
        betStruct memory _userBet;
        _userBet.option = matchs[_gameId].userBets[msg.sender].option;
        _userBet.amount = matchs[_gameId].userBets[msg.sender].amount;
        _userBet.odd = matchs[_gameId].userBets[msg.sender].odd;
        return _userBet;
    }

    //Funcion creada especificamete para controlar el reward a pagar
    function calculateReward(uint32 _gameId) public view returns(uint){
        uint amount = matchs[_gameId].userBets[msg.sender].amount * matchs[_gameId].userBets[msg.sender].odd / 10**18;     
        return amount;
    }

}