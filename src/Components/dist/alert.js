"use strict";
exports.__esModule = true;
exports.defaultAlertProps = void 0;
var react_1 = require("react");
var machine_1 = require("../function/machine");
var react_multi_lang_1 = require("react-multi-lang");
require("../assets/css/alert.css");
var Alert = function (_a) {
    /*     useEffect(() => {
    
        }, [isShowAlert]); */
    var isShowAlert = _a.isShowAlert, typeMachine = _a.typeMachine, title = _a.title, message = _a.message, cancel = _a.cancel, submit = _a.submit;
    if (!isShowAlert) {
        return null;
    }
    var t = react_multi_lang_1.useTranslation();
    return (react_1["default"].createElement("div", { className: "alert" },
        react_1["default"].createElement("div", { className: "alert__content" },
            react_1["default"].createElement("div", { className: "alert__image" },
                react_1["default"].createElement("img", { src: machine_1.getMachinePicture(typeMachine), alt: "machine" })),
            react_1["default"].createElement("div", { className: "alert__title" }, t(title)),
            react_1["default"].createElement("div", { className: "alert__message" }, t(message)),
            react_1["default"].createElement("div", { className: "alert__buttons" },
                react_1["default"].createElement("button", { className: "alert__button", onClick: cancel }, t("global.buttons.cancel")),
                react_1["default"].createElement("button", { className: "alert__button", onClick: submit }, t("global.buttons.yes"))))));
};
var defaultAlertProps = {
    message: "",
    title: "",
    submit: function () { },
    cancel: function () { },
    typeMachine: 0,
    isShowAlert: false
};
exports.defaultAlertProps = defaultAlertProps;
exports["default"] = Alert;
