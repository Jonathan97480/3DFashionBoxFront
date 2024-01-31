"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Components_1 = require("../Components");
var react_multi_lang_1 = require("react-multi-lang");
var Alert_1 = require("../Components/Alert");
function Home() {
    var _this = this;
    var t = react_multi_lang_1.useTranslation();
    var navigate = react_router_dom_1.useNavigate();
    //RECUPERATION DE LISTE DE JEUX POUR CARTE MERE H3 3D FASHION
    var _a = react_1["default"].useState(false), loading = _a[0], setLoading = _a[1];
    var _b = react_1["default"].useState(undefined), error = _b[0], setError = _b[1];
    var _c = react_1["default"].useState(Alert_1.defaultAlertProps), alert = _c[0], setAlert = _c[1];
    var handleBackupGameSdCard = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, json, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('http://localhost:8080/api/backupSdCard')];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    json = _a.sent();
                    if (json.error) {
                        setError(json.error);
                        return [2 /*return*/];
                    }
                    console.log(json);
                    setError(undefined);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    setError(error_1);
                    return [3 /*break*/, 5];
                case 5:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (loading ? react_1["default"].createElement("div", null, t("global.loading")) :
        react_1["default"].createElement("div", { className: "home" },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/addGame" },
                    react_1["default"].createElement("button", { className: "btnAddGame" }, t("home.addGame"))),
                react_1["default"].createElement("button", { onClick: function () { return setAlert(__assign(__assign({}, Alert_1.defaultAlertProps), { isShowAlert: true, title: "home.backupSdCard", message: "home.backupSdCardMessage", submit: handleBackupGameSdCard, cancel: function () { return setAlert(__assign(__assign({}, Alert_1.defaultAlertProps), { isShowAlert: false })); } })); }, className: "btnBackup" }, t("home.addGameSdCardInLib"))),
            react_1["default"].createElement(Components_1.Table, { onRowClick: function (row) {
                    navigate('/EditGameInfo', { state: { rowData: row } });
                } }),
            react_1["default"].createElement(Components_1.Alert, __assign({}, alert))));
}
exports["default"] = Home;
