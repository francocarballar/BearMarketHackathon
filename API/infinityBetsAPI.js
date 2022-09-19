import { FUNCTIONS, GAME_CREATE_REQUEST_ID, GAME_RESOLVE_REQUEST_ID, MAGIC } from "../constants";

let loadFeatures = (name, args) => {
  setup.functionName = name;
  setup.args = args;
  return setup;
};

const API = {
  gameCreate: (setup) => {
    loadFeatures(FUNCTIONS.GAME_CREATE, [
      GAME_CREATE_REQUEST_ID,
      MAGIC.GAME_CREATE,
    ]);
  },
  gameResolve: (setup) => {
    loadFeatures(FUNCTIONS.GAME_RESOLVE, [
      GAME_RESOLVE_REQUEST_ID,
      MAGIC.GAME_CREATE,
    ]);
  },
};

export default API;