"use strict";
exports.__esModule = true;
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
/**
 *  Search component for search game
 * @param placeholder:string
 * @param outPut: (value: string) => void
 * @param enter?: () => void
 * @returns  JSX.Element
 */
var Search = function (_a) {
    var placeholder = _a.placeholder, outPut = _a.outPut, enter = _a.enter;
    var _b = react_1.useState(""), search = _b[0], setSearch = _b[1];
    var handleChange = function (e) {
        setSearch(e.target.value);
        outPut(e);
    };
    return (React.createElement("div", { className: "search" },
        React.createElement("input", { type: "search", placeholder: placeholder, value: search, className: "search_input", onChange: function (e) { return handleChange(e); }, onKeyDown: function (e) {
                if (e.key === "Enter") {
                    enter && enter();
                }
            } }),
        React.createElement(fa_1.FaSearch, { className: "search_icon", onClick: function () {
                enter && enter();
            }, width: 20, height: 20 })));
};
exports["default"] = Search;
