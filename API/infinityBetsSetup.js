import { CHAIN_ID } from "../constants";

import model from "./model/model";

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
export default setup;