// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";


contract EnetscoresConsumer is ChainlinkClient {
    address public owner;
    using Chainlink for Chainlink.Request;
    using CBORChainlink for BufferChainlink.buffer;
    address link = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;
    address oracle = 0xB9756312523826A566e222a34793E414A81c88E1;
    struct GameCreate {
        uint32 gameId;
        uint40 startTime;
        string homeTeam;
        string awayTeam;
    }
    struct GameResolve {
        uint32 gameId;
        uint8 homeScore;
        uint8 awayScore;
        string status;
    }
    mapping(bytes32 => bytes[]) public requestIdGames;
    error FailedTransferLINK(address to, uint256 amount);

    constructor() {
        setChainlinkToken(link);
        setChainlinkOracle(oracle);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, 'only owner');
        _;
    }
    /* ========== EXTERNAL FUNCTIONS ========== */
    function cancelRequest(
        bytes32 _requestId,
        uint256 _payment,
        bytes4 _callbackFunctionId,
        uint256 _expiration
    ) external {
        cancelChainlinkRequest(_requestId, _payment, _callbackFunctionId, _expiration);
    }

    function fulfillSchedule(bytes32 _requestId, bytes[] memory _result)
        external
        recordChainlinkFulfillment(_requestId)
    {
        requestIdGames[_requestId] = _result;
    }

    function requestSchedule(
        bytes32 _specId,
        uint256 _payment,
        uint256 _market,
        uint256 _leagueId,
        uint256 _date
    ) external onlyOwner{
        Chainlink.Request memory req = buildOperatorRequest(_specId, this.fulfillSchedule.selector);
        req.addUint("market", _market);
        req.addUint("leagueId", _leagueId);
        req.addUint("date", _date);
        sendOperatorRequest(req, _payment);
    }

    function requestSchedule(
        bytes32 _specId,
        uint256 _payment,
        uint256 _market,
        uint256 _leagueId,
        uint256 _date,
        uint256[] calldata _gameIds
    ) external onlyOwner{
        Chainlink.Request memory req = buildOperatorRequest(_specId, this.fulfillSchedule.selector);
        req.addUint("market", _market);
        req.addUint("leagueId", _leagueId);
        req.addUint("date", _date);
        _addUintArray(req, "gameIds", _gameIds);
        sendOperatorRequest(req, _payment);
    }
    function setOracle(address _oracle) external {
        setChainlinkOracle(_oracle);
    }
    function setRequestIdGames(bytes32 _requestId, bytes[] memory _games) external {
        requestIdGames[_requestId] = _games;
    }
    function withdrawLink(uint256 _amount, address payable _payee) external {
        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        _requireTransferLINK(linkToken.transfer(_payee, _amount), _payee, _amount);
    }
    /* ========== PUBLIC VIEW FUNCTIONS ========== */
    function getGameCreate(bytes32 _requestId, uint256 _idx) public view returns (GameCreate memory) {
        return _getGameCreateStruct(requestIdGames[_requestId][_idx]);
    }
    function getGameResolve(bytes32 _requestId, uint256 _idx) public view returns (GameResolve memory) {
        return _getGameResolveStruct(requestIdGames[_requestId][_idx]);
    }
    function _getOracleAddress() public view returns (address) {
        return chainlinkOracleAddress();
    }
    /* ========== PRIVATE VIEW FUNCTIONS ========== */
    function _getGameCreateStruct(bytes memory _data) private view returns (GameCreate memory) {
        uint32 gameId = uint32(bytes4(_sliceDynamicArray(0, 4, _data)));
        uint40 startTime = uint40(bytes5(_sliceDynamicArray(4, 9, _data)));
        uint8 homeTeamLength = uint8(bytes1(_data[9]));
        uint256 endHomeTeam = 10 + homeTeamLength;
        string memory homeTeam = string(_sliceDynamicArray(10, endHomeTeam, _data));
        string memory awayTeam = string(_sliceDynamicArray(endHomeTeam, _data.length, _data));
        GameCreate memory gameCreate = GameCreate(gameId, startTime, homeTeam, awayTeam);
        return gameCreate;
    }
    function _getGameResolveStruct(bytes memory _data) private view returns (GameResolve memory) {
        uint32 gameId = uint32(bytes4(_sliceDynamicArray(0, 4, _data)));
        uint8 homeScore = uint8(bytes1(_data[4]));
        uint8 awayScore = uint8(bytes1(_data[5]));
        string memory status = string(_sliceDynamicArray(6, _data.length, _data));
        GameResolve memory gameResolve = GameResolve(gameId, homeScore, awayScore, status);
        return gameResolve;
    }
    function _sliceDynamicArray(
        uint256 _start,
        uint256 _end,
        bytes memory _data
    ) private view returns (bytes memory) {
        bytes memory result = new bytes(_end - _start);
        for (uint256 i = 0; i < _end - _start; ++i) {
            result[i] = _data[_start + i];
        }
        return result;
    }
    /* ========== PRIVATE PURE FUNCTIONS ========== */
    function _addUintArray(
        Chainlink.Request memory _req,
        string memory _key,
        uint256[] memory _values
    ) private pure {
        Chainlink.Request memory r2 = _req;
        r2.buf.encodeString(_key);
        r2.buf.startArray();
        uint256 valuesLength = _values.length;
        for (uint256 i = 0; i < valuesLength; ) {
            r2.buf.encodeUInt(_values[i]);
            unchecked {
                ++i;
            }
        }
        r2.buf.endSequence();
        _req = r2;
    }
    function _requireTransferLINK(
        bool _success,
        address _to,
        uint256 _amount
    ) private pure {
        if (!_success) {
            revert FailedTransferLINK(_to, _amount);
        }
    }

    //AGREGATED FUNCTIONS

    function getGameCreateStructLength(bytes32 _requestId) public view returns (uint) {
        return requestIdGames[_requestId].length;
    }

    function getGameResolveStructLength(bytes32 _requestId) public view returns (uint) {
        return requestIdGames[_requestId].length;
    }

  

}
