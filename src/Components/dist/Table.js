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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var gamesSlice_1 = require("../redux/slice/gamesSlice");
var react_notifications_component_1 = require("react-notifications-component");
var react_redux_1 = require("react-redux");
var react_multi_lang_1 = require("react-multi-lang");
var Alert_1 = require("./Alert");
var EditGameInfo_1 = require("./EditGameInfo");
var img_1 = require("../assets/img");
var react_router_dom_1 = require("react-router-dom");
var Search_1 = require("./Search");
function Table() {
    var _this = this;
    var _a = react_1.useState(react_redux_1.useSelector(function (state) { return state.Games.games; })), data = _a[0], setData = _a[1];
    var dispatch = react_redux_1.useDispatch();
    var _b = react_1["default"].useState({ page: 1, limit: 50, totalPages: 0 }), pagination = _b[0], setPagination = _b[1];
    var _c = react_1["default"].useState(false), loading = _c[0], setLoading = _c[1];
    var _d = react_1["default"].useState(false), isFilter = _d[0], setIsFilter = _d[1];
    var _e = react_1["default"].useState(Alert_1.defaultAlertProps), alert = _e[0], setAlert = _e[1];
    var _f = react_1["default"].useState(EditGameInfo_1.defaultDataEdit), editGameInfo = _f[0], setEditGameInfo = _f[1];
    var ADREESE_API = "http://83.198.193.155:8080/api/";
    var t = react_multi_lang_1.useTranslation();
    var title = t('table.title');
    react_1.useEffect(function () {
        setData(data);
        if (data.length === 0) {
            handlegetGameList(pagination.page);
        }
    }, []);
    var handleSearch = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var value, response, json, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = event.target.value.toLowerCase();
                    if (value === "")
                        return [2 /*return*/, setData(data)];
                    if (value.length < 3)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(ADREESE_API + "findGame/" + value)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    json = _a.sent();
                    if (json.success) {
                        setData(json.data.games);
                    }
                    else {
                        setData([]);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleClickRow = function (row) {
        if (alert.isShowAlert || editGameInfo.isShow)
            return;
        setEditGameInfo(__assign(__assign({}, EditGameInfo_1.defaultDataEdit), { isShow: true, rowData: row }));
    };
    var handlegetGameList = function (p) { return __awaiter(_this, void 0, void 0, function () {
        var response, json, newData, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isFilter)
                        return [2 /*return*/];
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(ADREESE_API + "gameList/" + p + '/' + pagination.limit)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    json = _a.sent();
                    if (json.success) {
                        setPagination({ page: p, limit: pagination.limit, totalPages: json.data.totalPages });
                        newData = __spreadArrays(data, json.data.games);
                        dispatch(gamesSlice_1.setGames(newData));
                        setData(newData);
                        setLoading(false);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error:', error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var columns = [
        { key: 'action', title: 'action' },
        { key: 'emu_id', title: 'emu_id' },
        /*   { key: 'pid', title: 'pid' }, */
        /*      { key: 'mp4name', title: 'mp4name' },
             { key: 'romname', title: 'romname' }, */
        /*  { key: 'pinyin', title: 'pinyin' },
         { key: 'title_cn', title: 'title_cn' }, */
        { key: 'title_en', title: 'title_en' },
        /* { key: 'title_ko', title: 'title_ko' },
        { key: 'title_es', title: 'title_es' },
        { key: 'title_jp', title: 'title_jp' },
        { key: 'title_tw', title: 'title_tw' }, */
        { key: 'is_show', title: 'is_show' },
        { key: 'is_favourite', title: 'is_favourite' },
        { key: 'dim_type', title: 'dim_type' },
        /*    { key: 'is_timer', title: 'is_timer' }, */
        /*   { key: 'load_time', title: 'load_time' }, */
        { key: 'category', title: 'category' },
    ];
    var SpecilaColumn = function (_a) {
        var keyColumn = _a.keyColumn, row = _a.row, index = _a.index;
        var iconMachine = function (value) {
            var emu_id = typeof value === 'number' ? value : parseInt(value, 10);
            switch (emu_id) {
                case 10:
                    return img_1.megaDrive;
                case 6:
                    return img_1.nes;
                case 7:
                    return img_1.snes;
                case 4:
                    return img_1.n64;
                case 8:
                    return img_1.gba;
                case 9:
                    return img_1.gbc;
                case 0:
                    return img_1.neoGeo;
                case 12:
                    return img_1.pcEngine;
                case 3:
                    return img_1.ps1;
                case 101:
                    return img_1.arcade;
                case 2:
                    return img_1.arcade;
                default:
                    return img_1.megaDrive;
            }
        };
        var iconCategory = function (value) {
            var category = typeof value === 'number' ? value : parseInt(value, 10);
            switch (category) {
                case 4:
                    return img_1.conbatGroupe;
                case 5:
                    return img_1.puzzle;
                case 2:
                    return img_1.shootEmUp;
                case 3:
                    return img_1.shoot;
                case 6:
                    return img_1.sport;
                case 1:
                    return img_1.versus;
                default:
                    return img_1.conbatGroupe;
            }
        };
        switch (keyColumn) {
            case 'emu_id':
                return react_1["default"].createElement("td", { key: keyColumn + index + row.pid },
                    react_1["default"].createElement("img", { src: iconMachine(row[keyColumn]), alt: "", width: 50 }));
            case 'category':
                return react_1["default"].createElement("td", { key: keyColumn + index + row.pid },
                    react_1["default"].createElement("img", { src: iconCategory(row[keyColumn]), alt: "", width: 50 }));
            case 'is_show':
                return react_1["default"].createElement("td", { key: keyColumn + index + row.pid },
                    react_1["default"].createElement("img", { src: row[keyColumn] ? img_1.show : img_1.noShow, alt: "", width: 50, onClick: function () { return handleSetIsShow(row); } }));
            case 'is_favourite':
                return react_1["default"].createElement("td", { key: keyColumn + index + row.pid },
                    react_1["default"].createElement("img", { src: row[keyColumn] ? img_1.fav : img_1.noFav, alt: "", width: 50, onClick: function () { return handleSetIsFav(row); } }));
            case 'action':
                return react_1["default"].createElement("td", { className: "clickable", onClick: function () { return setAlert(__assign(__assign({}, Alert_1.defaultAlertProps), { isShowAlert: editGameInfo.isShow ? false : true, title: "notif.deleteGame.alert.title", message: "notif.deleteGame.alert.message", submit: function () { return handleDelete(row); }, cancel: function () {
                            setAlert(Alert_1.defaultAlertProps);
                        } })); } }, "Delete");
            case 'title_en':
                return react_1["default"].createElement("td", { className: "clickable", key: keyColumn + index + row.pid, onClick: function () { return handleClickRow(row); } }, row[keyColumn]);
            default:
                return react_1["default"].createElement("td", { className: "clickable", key: keyColumn + index + row.pid }, row[keyColumn]);
        }
    };
    var handleFilter = function (value) { return __awaiter(_this, void 0, void 0, function () {
        var response, json, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(ADREESE_API + "filterGame/" + value)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    if (json.success) {
                        setIsFilter(true);
                        setData(json.data.games);
                    }
                    else {
                        setData([]);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error:', error_3);
                    throw error_3;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (row) {
        react_notifications_component_1.Store.addNotification({
            title: t("notif.deleteGame.standby.title"),
            message: t("notif.deleteGame.standby.message"),
            type: "info",
            insert: "top",
            container: "top-right",
            dismiss: {
                duration: 3000,
                onScreen: true
            }
        });
        fetch(ADREESE_API + "deleteGame/" + row.pid, {
            method: 'DELETE'
        })
            .then(function (response) { return response.json(); })
            .then(function (_data) {
            if (_data.success) {
                var newData = data.filter(function (item) { return item.pid !== row.pid; });
                dispatch(gamesSlice_1.setGames(newData));
                react_notifications_component_1.Store.addNotification({
                    title: t("notif.deleteGame.success.title"),
                    message: t("notif.deleteGame.success.message"),
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    }
                });
            }
            else {
                react_notifications_component_1.Store.addNotification({
                    title: t("notif.deleteGame.error.title"),
                    message: t("notif.deleteGame.error.message"),
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    }
                });
            }
        })["catch"](function (error) {
            console.error('Error:', error);
        });
    };
    var scrollDection = function (event) {
        if (loading)
            return;
        var target = event.target;
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
            if (pagination.page < pagination.totalPages) {
                var p = pagination.page + 1;
                handlegetGameList(p);
            }
        }
    };
    var handleSetIsShow = function (row) { return __awaiter(_this, void 0, void 0, function () {
        var is_show, response, json, newData, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (alert.isShowAlert || editGameInfo.isShow)
                        return [2 /*return*/];
                    is_show = !row.is_show;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(ADREESE_API + "setIsShow/" + row.pid + '/' + is_show)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    json = _a.sent();
                    if (json.success) {
                        newData = data.map(function (item) {
                            if (item.pid === row.pid) {
                                item = __assign(__assign({}, item), { is_show: is_show });
                            }
                            return item;
                        });
                        react_notifications_component_1.Store.addNotification({
                            title: t("notif.setIsShow.success.title"),
                            message: t("notif.setIsShow.success.message"),
                            type: "success",
                            insert: "top",
                            container: "top-right",
                            dismiss: {
                                duration: 3000,
                                onScreen: true
                            }
                        });
                        setData(newData);
                    }
                    else {
                        react_notifications_component_1.Store.addNotification({
                            title: t("notif.setIsShow.error.title"),
                            message: t("notif.setIsShow.error.message"),
                            type: "danger",
                            insert: "top",
                            container: "top-right",
                            dismiss: {
                                duration: 3000,
                                onScreen: true
                            }
                        });
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error('Error:', error_4);
                    throw error_4;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleSetIsFav = function (row) { return __awaiter(_this, void 0, void 0, function () {
        var is_favourite, response, json, newData, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (alert.isShowAlert || editGameInfo.isShow)
                        return [2 /*return*/];
                    is_favourite = !row.is_favourite;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(ADREESE_API + "setIsFav/" + row.pid + '/' + is_favourite)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    json = _a.sent();
                    if (json.success) {
                        newData = data.map(function (item) {
                            if (item.pid === row.pid) {
                                item = __assign(__assign({}, item), { is_favourite: is_favourite });
                            }
                            return item;
                        });
                        react_notifications_component_1.Store.addNotification({
                            title: t("notif.setIsFavourite.success.title"),
                            message: t("notif.setIsFavourite.success.message"),
                            type: "success",
                            insert: "top",
                            container: "top-right",
                            dismiss: {
                                duration: 3000,
                                onScreen: true
                            }
                        });
                        setData(newData);
                    }
                    else {
                        react_notifications_component_1.Store.addNotification({
                            title: t("notif.setIsFavourite.error.title"),
                            message: t("notif.setIsFavourite.error.message"),
                            type: "danger",
                            insert: "top",
                            container: "top-right",
                            dismiss: {
                                duration: 3000,
                                onScreen: true
                            }
                        });
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    console.error('Error:', error_5);
                    throw error_5;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var filter = {
        0: "neoGeo",
        101: "fba",
        3: "psx",
        7: "snes",
        6: "nes",
        8: "gba",
        9: "gbc",
        4: "n64",
        10: "md"
    };
    return (react_1["default"].createElement("div", { className: "table" },
        react_1["default"].createElement("h1", null, title),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { className: "filter" }, Object.keys(filter).map(function (key) { return (react_1["default"].createElement("button", { key: key, onClick: function () { return handleFilter(parseInt(key)); } }, t("table.filter." + filter[key]))); })),
            react_1["default"].createElement(Search_1["default"], { placeholder: t("table.search.placeholder"), outPut: function (value) { return handleSearch(value); } })),
        react_1["default"].createElement("div", null,
            "  ",
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/addGame" },
                react_1["default"].createElement("button", { className: "btnAddGame" }, t("home.addGame"))),
            react_1["default"].createElement("table", null,
                react_1["default"].createElement("thead", null,
                    react_1["default"].createElement("tr", null, columns.map(function (column, index) { return (index === 0 ? react_1["default"].createElement("th", { key: "action" }, t("table.rows.action")) :
                        react_1["default"].createElement("th", { key: column.key }, t("table.rows." + column.title))); }))),
                react_1["default"].createElement("tbody", { onScroll: function (event) {
                        scrollDection(event);
                    } },
                    data.map(function (row) { return (react_1["default"].createElement("tr", { key: row.pid }, columns.map(function (column, index) { return (react_1["default"].createElement(SpecilaColumn, { key: index + "lstC", index: index, keyColumn: column.key, row: row })); }))); }),
                    loading ? react_1["default"].createElement("tr", null,
                        react_1["default"].createElement("td", null, t("global.loading"))) : null))),
        react_1["default"].createElement(Alert_1["default"], { isShowAlert: alert.isShowAlert, typeMachine: 0, title: t(alert.title), message: t(alert.message), submit: function () { alert.submit(); }, cancel: function () { alert.cancel(); } }),
        react_1["default"].createElement(EditGameInfo_1["default"], { isShow: editGameInfo.isShow, rowData: editGameInfo.rowData, onClose: function () { return setEditGameInfo(EditGameInfo_1.defaultDataEdit); } })));
}
exports["default"] = Table;
