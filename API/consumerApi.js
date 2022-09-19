const {
    DAI_CONTRACT_ADDRESS,
    BET_CONTRACT_ADDRESS,
    GAME_CREATE_REQUEST_ID,
    GAME_RESOLVE_REQUEST_ID,
    DAI_ABI,
    BET_CONTRACT_ABI,
    CHAIN_ID,
    FUNCTIONS,
    MAGIC
  } = require('../constants')


let model = () => {
    let setup = {}
    setup.chain = CHAIN_ID
    setup.addressOrName = BET_CONTRACT_ADDRESS
    setup.contractInterface = BET_CONTRACT_ABI
    setup.functionName = ''
    setup.args = []

    return setup;
}


class Setup { 
    constructor() {
        this.chain = CHAIN_ID
        this.addressOrName = ''
        this.contractInterface = ''
        this.functionName = ''
        this.args = []
    }

    static set setModel( model ) { 
        this.chain = model.chain
        this.addressOrName = model.addressOrName
        this.contractInterface = model.contractInterface
        this.functionName = model.functionName
        this.args = model.args
    }

    chain(id) {
        this.chain = id
    }

    addressOrName(address) {
        this.addressOrName = address
    }

    contractInterface(contract) {
        this.contractInterface = contract
    }

    functionName(name) {    
        this.functionName = name
    }

    args(arg) {
        this.args = [...arg]
    }
}


let setup = new Setup().setModel = model();

API = {
    gameCreate: (setup) => {
        setup.functionName = FUNCTIONS.GAME_CREATE,
        setup.args = [GAME_CREATE_REQUEST_ID, MAGIC.GAME_CREATE]
        return setup
    },
    gameResolve: (setup) => 3,

    setBet: (setup) => 3,
}



API.gameCreate(setup)
console.log(setup)



// setup => args => {
//     return createSetup.init(setup)(args)
// }