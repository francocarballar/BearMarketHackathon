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

module.exports = API;