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
exports.defaultDataEdit = void 0;
var react_1 = require("react");
var react_multi_lang_1 = require("react-multi-lang");
require("../assets/css/editGameInfo.css");
var react_notifications_component_1 = require("react-notifications-component");
var defaultDataEdit = {
    rowData: {
        pid: 0,
        title_en: "",
        title_jp: "",
        title_cn: "",
        title_tw: "",
        title_ko: "",
        title_es: "",
        category: 0,
        load_time: 0,
        open_time: 0,
        level: 0,
        life: 0,
        mp4name: "",
        is_show: false,
        is_favourite: false,
        romname: "",
        pinyin: "",
        dim_type: 0,
        is_timer: false,
        resname: "",
        update_time: 0,
        emu_id: 0,
        emu_name: 0,
        remark: 0,
        is_comb: false
    },
    isShow: false,
    onClose: function () {
        console.log("close");
    }
};
exports.defaultDataEdit = defaultDataEdit;
function EditGameInfo(_a) {
    var _this = this;
    var rowData = _a.rowData, isShow = _a.isShow, onClose = _a.onClose;
    var _b = react_1.useState(rowData), data = _b[0], setData = _b[1];
    var _c = react_1.useState(""), video = _c[0], setVideo = _c[1];
    var t = react_multi_lang_1.useTranslation();
    var BASE_VIDEO_URL = 'http://localhost:8080/video/';
    var BASE_API_URL = 'http://localhost:8080/api/';
    react_1.useLayoutEffect(function () {
        if (video != "" + BASE_VIDEO_URL + rowData.mp4name + ".mp4") {
            setVideo("" + BASE_VIDEO_URL + rowData.mp4name + ".mp4");
        }
        setData(rowData);
    }, [video, rowData.mp4name]);
    var handleDataChange = function (key, value) {
        setData(function (prevData) {
            var _a;
            return (__assign(__assign({}, prevData), (_a = {}, _a[key] = value, _a)));
        });
    };
    var checkIsArcadeGame = function (emu_id) {
        if (emu_id === 0 || emu_id == 101) {
            return true;
        }
        return false;
    };
    /* Data UPDATE IN API */
    var handleUpdateVideo = function (file) { return __awaiter(_this, void 0, void 0, function () {
        var newFormData, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newFormData = new FormData();
                    newFormData.append('video', file);
                    return [4 /*yield*/, fetchData(BASE_API_URL + "updateVideo/" + rowData.pid, {
                            method: 'POST',
                            body: newFormData
                        })];
                case 1:
                    result = _a.sent();
                    if (!result.error) {
                        setVideo("");
                        /* update view video player  */
                    }
                    else {
                        alert('video not updated');
                        console.error(result.error.message);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleUpdateData = function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchData(BASE_API_URL + "updateGame", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })];
                case 1:
                    result = _a.sent();
                    if (!result.error) {
                        alert('data updated');
                    }
                    else {
                        alert('data not updated');
                        console.error(result.error.message);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var checISDataAndRawDataEqual = function () {
        return Object.keys(data).every(function (key) { return data[key] === rowData[key]; });
    };
    if (!isShow) {
        return null;
    }
    function handleUpdateRomFile(file) {
        return __awaiter(this, void 0, void 0, function () {
            var newFormData, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newFormData = new FormData();
                        newFormData.append('rom', file);
                        return [4 /*yield*/, fetchData(BASE_API_URL + "updateRom/" + rowData.pid, {
                                method: 'POST', body: newFormData
                            })];
                    case 1:
                        result = _a.sent();
                        if (!result.error) {
                            react_notifications_component_1.Store.addNotification({
                                title: t("notif.newRomFile.success.title"),
                                message: t("notif.newRomFile.success.message"),
                                type: "success",
                                insert: "top",
                                container: "top-right",
                                animationIn: ["animate__animated", "animate__fadeIn"],
                                animationOut: ["animate__animated", "animate__fadeOut"],
                                dismiss: {
                                    duration: 5000,
                                    onScreen: true
                                }
                            });
                        }
                        else {
                            react_notifications_component_1.Store.addNotification({
                                title: t("notif.newRomFile.error.title"),
                                message: t("notif.newRomFile.error.message"),
                                type: "danger",
                                insert: "top",
                                container: "top-right",
                                animationIn: ["animate__animated", "animate__fadeIn"],
                                animationOut: ["animate__animated", "animate__fadeOut"],
                                dismiss: {
                                    duration: 5000,
                                    onScreen: true
                                }
                            });
                            console.error(result.error.message);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    return (react_1["default"].createElement("div", { className: "modal" },
        react_1["default"].createElement("h1", null,
            " ",
            data.title_en,
            " "),
        react_1["default"].createElement("div", { className: "modal_contenair" },
            react_1["default"].createElement("div", { className: "left-side" },
                react_1["default"].createElement("span", null,
                    react_1["default"].createElement("label", null, t("namegame")),
                    react_1["default"].createElement("input", { type: "text", name: "title_en", value: data.title_en, onChange: function (e) { return handleDataChange("title_en", e.target.value); } })),
                react_1["default"].createElement("span", null,
                    react_1["default"].createElement("label", null, t("category.title")),
                    react_1["default"].createElement("select", { name: "category", value: data.category, onChange: function (e) { return handleDataChange("category", e.target.value); } },
                        react_1["default"].createElement("option", { value: "0" }, t("category.list.0")),
                        react_1["default"].createElement("option", { value: '1' }, t("category.list.1")),
                        react_1["default"].createElement("option", { value: "2" },
                            t("category.list.2"),
                            " "),
                        react_1["default"].createElement("option", { value: "3" }, t("category.list.3")),
                        react_1["default"].createElement("option", { value: "5" }, t("category.list..5")),
                        react_1["default"].createElement("option", { value: "6" }, t("category.list.6")))),
                react_1["default"].createElement("span", null,
                    react_1["default"].createElement("button", { onClick: function () {
                            var input = document.createElement('input');
                            input.type = 'file';
                            input.accept = '.zip,.md,.nes,.smc,.sfc,.gb,.gbc,.gba,.bin,.iso';
                            input.click();
                            /* get input change value */
                            input.addEventListener('input', function (event) {
                                var file = event.target.files[0];
                                handleUpdateRomFile(file);
                            });
                        } }, t("global.buttons.updateRom"))),
                checkIsArcadeGame(data.emu_id) ? react_1["default"].createElement("div", { className: "advanced-options" },
                    react_1["default"].createElement("span", null,
                        react_1["default"].createElement("label", null, t("global.game.loadTime")),
                        react_1["default"].createElement("input", { type: "text", value: data.load_time, onChange: function (e) { return handleDataChange("load_time", e.target.value); }, placeholder: t("global.game.placeholderLoadTime") })),
                    react_1["default"].createElement("span", null,
                        react_1["default"].createElement("label", null, t("global.game.gameTime")),
                        react_1["default"].createElement("input", { type: "text", value: data.open_time, onChange: function (e) { return handleDataChange("open_time", e.target.value); }, placeholder: t("global.game.placeholderTime") })),
                    react_1["default"].createElement("span", null,
                        react_1["default"].createElement("label", null,
                            t("global.game.dificulty"),
                            " "),
                        react_1["default"].createElement("input", { type: "text", value: data.level, onChange: function (e) { return handleDataChange("level", e.target.value); }, placeholder: t("global.game.placeholderDificulty") })),
                    react_1["default"].createElement("span", null,
                        react_1["default"].createElement("label", null,
                            t("global.game.numberCredit"),
                            " "),
                        react_1["default"].createElement("input", { type: "text", value: data.life, onChange: function (e) { return handleDataChange("life", e.target.value); }, placeholder: t("global.game.placeholderNumberCredit") })),
                    react_1["default"].createElement("span", null,
                        react_1["default"].createElement("label", null,
                            t("global.game.titleGameOtherLang"),
                            " "),
                        react_1["default"].createElement("span", null,
                            react_1["default"].createElement("input", { type: "text", value: data.title_jp, onChange: function (e) { return handleDataChange("title_jp", e.target.value); }, placeholder: t("global.game.placeholderJapan") }),
                            react_1["default"].createElement("input", { type: "text", value: data.title_cn, onChange: function (e) { return handleDataChange("title_cn", e.target.value); }, placeholder: t("global.game.placeholderChinese") }),
                            react_1["default"].createElement("input", { type: "text", value: data.title_tw, onChange: function (e) { return handleDataChange("title_tw", e.target.value); }, placeholder: t("global.game.placeholderTaiwan") }),
                            react_1["default"].createElement("input", { type: "text", value: data.title_ko, onChange: function (e) { return handleDataChange("title_ko", e.target.value); }, placeholder: t("global.game.placeholderKorean") }),
                            react_1["default"].createElement("input", { type: "text", value: data.title_es, onChange: function (e) { return handleDataChange("title_es", e.target.value); }, placeholder: t("global.game.placeholderEspagnol") })))) : null,
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("button", { disabled: checISDataAndRawDataEqual(), onClick: handleUpdateData }, t("global.buttons.save"))),
            react_1["default"].createElement("div", { className: "right-side" },
                react_1["default"].createElement(VideoPlayer, { url: video }),
                react_1["default"].createElement("button", { onClick: 
                    /* open input file */
                    function () {
                        var input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.mp4';
                        input.click();
                        /* get input change value */
                        input.addEventListener('input', function (event) {
                            var file = event.target.files[0];
                            handleUpdateVideo(file);
                        });
                    } }, t("global.buttons.changeVideoDemo"))),
            react_1["default"].createElement("button", { onClick: function () { return onClose(); } }, t("global.buttons.close")))));
}
exports["default"] = EditGameInfo;
var VideoPlayer = function (_a) {
    var url = _a.url;
    var t = react_multi_lang_1.useTranslation();
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h2", null, t("videoPlayer.title")),
        react_1["default"].createElement("video", { width: "640", height: "360", controls: true },
            react_1["default"].createElement("source", { src: url }),
            t("videoPlayer.notSupportTag"))));
};
var fetchData = function (url, options) { return __awaiter(void 0, void 0, void 0, function () {
    var response, resultJson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(url, options)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                resultJson = _a.sent();
                if (response.ok) {
                    return [2 /*return*/, resultJson];
                }
                else {
                    console.error(resultJson.error.message);
                    throw new Error('Data not fetched successfully.');
                }
                return [2 /*return*/];
        }
    });
}); };
