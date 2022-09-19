const {
  DAI_CONTRACT_ADDRESS,
  BET_CONTRACT_ADDRESS,
  GAME_CREATE_REQUEST_ID,
  GAME_RESOLVE_REQUEST_ID,
  DAI_ABI,
  BET_CONTRACT_ABI,
  CHAIN_ID,
  FUNCTIONS,
  MAGIC,
} = require("../constants");

const model = require("./model/model");

class Setup {
  constructor() {
    this.chain = CHAIN_ID;
    this.addressOrName = "";
    this.contractInterface = "";
    this.functionName = "";
    this.args = [];
  }

  static set setModel(model) {
    this.chain = model.chain;
    this.addressOrName = model.addressOrName;
    this.contractInterface = model.contractInterface;
    this.functionName = model.functionName;
    this.args = model.args;
  }

  chain(id) {
    this.chain = id;
  }

  addressOrName(address) {
    this.addressOrName = address;
  }

  contractInterface(contract) {
    this.contractInterface = contract;
  }

  functionName(name) {
    this.functionName = name;
  }

  args(arg) {
    this.args = [...arg];
  }
}

let setup = (new Setup().setModel = model());
module.exports = setup;