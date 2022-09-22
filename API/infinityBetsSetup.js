// import { CHAIN_ID } from "../constants";

// import model from "./model/model";


let CHAIN_ID = require("../constants")
let model = require("./model/model");

//refactor , make a mapper class with an static method, with the corresponding jSON
// and returns an instance


class Setup {
  constructor() {
    this.chain = CHAIN_ID;
    this.addressOrName = "";
    this.contractInterface = "";
    this.functionName = "";
    this.args = [];
  }

  set setModel(model) {
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

let setup = new Setup()
setup.setModel = model()

console.log("LLEGCs", setup)

// let sett = setup;
// sett.functionName = "getGameCreate";
// sett.args = [GAME_CREATE_REQUEST_ID, 0];

export default setup;