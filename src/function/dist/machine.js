"use strict";
exports.__esModule = true;
exports.getMachinePicture = void 0;
var img_1 = require("../assets/img");
var getMachinePicture = function (machineId) {
    switch (machineId) {
        case 8:
            return img_1.gba;
        case 9:
            return img_1.gbc;
        case 10:
            return img_1.megaDrive;
        case 101:
            return img_1.arcade;
        case 4:
            return img_1.n64;
        case 7:
            return img_1.snes;
        case 6:
            return img_1.nes;
        case 0:
            return img_1.neoGeo;
        case 3:
            return img_1.ps1;
        default:
            throw new Error("Machine not found");
    }
};
exports.getMachinePicture = getMachinePicture;
