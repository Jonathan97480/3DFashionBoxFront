"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Pages_1 = require("./Pages");
var react_notifications_component_1 = require("react-notifications-component");
var react_multi_lang_1 = require("react-multi-lang");
require("react-notifications-component/dist/theme.css");
var react_redux_1 = require("react-redux");
var store_1 = require("./redux/store");
var fr_json_1 = require("./lang/fr.json");
require("./scss/style.scss");
react_multi_lang_1.setTranslations({ fr: fr_json_1["default"] });
react_multi_lang_1.setDefaultLanguage('fr');
function App() {
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement(react_redux_1.Provider, { store: store_1["default"] },
            react_1["default"].createElement(react_notifications_component_1.ReactNotifications, null),
            react_1["default"].createElement(react_router_dom_1.HashRouter, null,
                react_1["default"].createElement(react_router_dom_1.Routes, null,
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/", element: react_1["default"].createElement(Pages_1.Home, null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/addGame", element: react_1["default"].createElement(Pages_1.AddGame, null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "*", element: react_1["default"].createElement("div", null, "404 Not Found") }))))));
}
exports["default"] = App;
