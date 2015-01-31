var keyMirror = require('keymirror');

var Constants = {
  PayloadSources: keyMirror({
    VIEW_ACTION: null,
    SERVER_ACTION: null
  }),

  ActionTypes: keyMirror({
    RECEIVE_CREATED_WORLD: null,
    RECEIVE_WORLDS: null,
    WORLD_DESTROY: null,
    RECEIVE_TRACKS: null,
    RECEIVE_PROGRAMS: null
  })
};

module.exports = Constants;