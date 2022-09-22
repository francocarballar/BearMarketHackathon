import { FUNCTIONS, GAME_CREATE_REQUEST_ID, GAME_RESOLVE_REQUEST_ID, MAGIC } from "../constants";

// let loadFeatures = (setup, name, args) => { 
//     return setup;
// };

/*

refact
change request ids , from events in the blckchain
*/

const API = {
  gameCreate: (setup) => {
    let set = setup;
    set.functionName = FUNCTIONS.GAME_CREATE;
    set.args = [GAME_CREATE_REQUEST_ID, 0];
    return set
  },
  gameResolve: (setup) => {
    let set = setup;
    set.functionName = FUNCTIONS.GAME_RESOLVE;
    set.args = [GAME_RESOLVE_REQUEST_ID, MAGIC.GAME_CREATE];
    return set
  }, approve: (setup) => {
    let set = setup;
    set.addressOrName = DAI_CONTRACT_ADDRESS;
    set.contractInterface = DAI_ABI;
    set.functionName = FUNCTIONS.APPROVE;
    set.args = [BET_CONTRACT_ADDRESS, MAGIC.APPROVE];
    return set
  }, setBet: (setup) => {
    let set = setup;
    set.args = [GAME_CREATE_REQUEST_ID, MAGIC.APPROVE, 0];
    return set
  }
};

export default API