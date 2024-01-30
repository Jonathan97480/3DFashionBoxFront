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
exports.__esModule = true;
var react_1 = require("react");
function AddGame() {
    var _a;
    var _b = react_1.useState({
        roms: undefined,
        romsOriginalName: '',
        video: undefined,
        videoOriginalName: '',
        name: '',
        machine: '',
        type: '2d'
    }), formData = _b[0], setFormData = _b[1];
    var handleChange = function (field, value) {
        var _a;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[field] = value, _a)));
        console.log(formData);
    };
    var handleFileChange = function (field, e) {
        if (!e.target.files) {
            console.error('No file selected');
            return;
        }
        var file = e.target.files[0];
        var name_key = field + "OriginalName";
        if (field === 'roms') {
            setFormData(__assign(__assign({}, formData), { roms: file, romsOriginalName: file ? file.name : '', name: file ? file.name.split('.')[0] : '' }));
        }
        else if (field === 'video') {
            setFormData(__assign(__assign({}, formData), { video: file, videoOriginalName: file ? file.name : '' }));
        }
    };
    var pushGameInDatabase = function () {
        var roms = formData.roms, video = formData.video, name = formData.name, machine = formData.machine, type = formData.type, romsOriginalName = formData.romsOriginalName, videoOriginalName = formData.videoOriginalName;
        console.log(roms);
        if (roms && video && name && machine && type) {
            var newFormData = new FormData();
            newFormData.append('roms', roms);
            newFormData.append('video', video);
            newFormData.append('name', name);
            newFormData.append('machine', machine);
            newFormData.append('type', type);
            newFormData.append('romsOriginalName', romsOriginalName);
            newFormData.append('videoOriginalName', videoOriginalName);
            fetch('http://localhost:8080/api/addGame', {
                method: 'POST',
                body: newFormData
            })
                .then(function (response) {
                console.log(response);
                // Vous pouvez effectuer des actions supplémentaires ici
                handleCleearAllInput();
            })["catch"](function (error) {
                console.log(error);
            });
        }
        else {
            alert('Veuillez remplir tous les champs');
        }
    };
    var handleCleearAllInput = function () {
        setFormData(__assign(__assign({}, formData), { roms: undefined, romsOriginalName: '', video: undefined, videoOriginalName: '', name: '', machine: '', type: '2d' }));
    };
    return (react_1["default"].createElement("div", { className: "addGame" },
        react_1["default"].createElement("h1", null, "AddGame"),
        react_1["default"].createElement("label", { htmlFor: "roms" }, "Roms"),
        react_1["default"].createElement("input", { type: "file", value: ((_a = formData.roms) === null || _a === void 0 ? void 0 : _a.type) === 'application/zip' ? formData.romsOriginalName : '', name: "roms", id: "roms", onChange: function (e) { return handleFileChange('roms', e); } }),
        react_1["default"].createElement("label", { htmlFor: "video" }, "Video"),
        react_1["default"].createElement("input", { type: "file" /* value={
                formData.video?.type === 'video/mp4' ? formData.videoOriginalName : ''

            } */, name: "video", id: "video", onChange: function (e) { return handleFileChange('video', e); } }),
        react_1["default"].createElement("label", { htmlFor: "name" }, "Name"),
        react_1["default"].createElement("input", { type: "text", value: formData.name, name: "name", id: "name", onChange: function (e) { return handleChange('name', e.target.value); } }),
        react_1["default"].createElement("label", { htmlFor: "type" }, "Type"),
        react_1["default"].createElement("select", { name: "type", value: formData.type, id: "type", onChange: function (e) { return handleChange('type', e.target.value); }, defaultValue: formData.type },
            react_1["default"].createElement("option", { value: "2d" }, "2D"),
            react_1["default"].createElement("option", { value: "3d" }, "3D")),
        react_1["default"].createElement("div", { className: "btn_validate" },
            react_1["default"].createElement("button", { onClick: pushGameInDatabase }, "Valider"))));
}
exports["default"] = AddGame;
