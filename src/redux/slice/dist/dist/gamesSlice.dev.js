"use strict";
/* eslint-disable */

var _a;

exports.__esModule = true;
exports.selectGamesLoading = exports.selectGames = exports.clearGames = exports.setError = exports.setGames = exports.GamesStatuSlice = void 0;

var toolkit_1 = require("@reduxjs/toolkit");

var initialState = {
  games: null,
  error: null,
  loading: false
}; //eslint-disable-next-line

exports.GamesStatuSlice = toolkit_1.createSlice({
  name: 'Games',
  initialState: initialState,
  reducers: {
    setGames: function setGames(state, action) {
      state.games = action.payload;
      state.error = null;
    },
    setError: function setError(state, action) {
      state.error = action.payload;
    },
    clearGames: function clearGames(state, action) {
      state.games = null;
      state.error = null;
    }
  }
}); //eslint-disable-next-line

exports.setGames = (_a = exports.GamesStatuSlice.actions, _a.setGames), exports.setError = _a.setError, exports.clearGames = _a.clearGames;

exports.selectGames = function (state) {
  return state.Games.games;
};

exports.selectGamesLoading = function (state) {
  return state.Games.loading;
};

exports["default"] = exports.GamesStatuSlice.reducer;