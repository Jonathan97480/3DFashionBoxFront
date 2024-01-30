"use strict";
var _a;
exports.__esModule = true;
var toolkit_1 = require("@reduxjs/toolkit");
var gamesSlice_1 = require("./slice/gamesSlice");
var store = toolkit_1.configureStore({
    reducer: (_a = {},
        _a[gamesSlice_1.GamesStatuSlice.name] = gamesSlice_1.GamesStatuSlice.reducer,
        _a),
    devTools: true
});
exports["default"] = store;
