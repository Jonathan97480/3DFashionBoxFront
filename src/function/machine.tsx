
import { gba, megaDrive, n64, nes, snes, arcade, gbc, ps1, neoGeo } from "../assets/img";

const getMachinePicture = (machineId: number) => {
    switch (machineId) {
        case 8:
            return gba;
        case 9:
            return gbc;
        case 10:
            return megaDrive;
        case 101:
            return arcade;
        case 4:
            return n64;
        case 7:
            return snes;
        case 6:
            return nes;
        case 0:
            return neoGeo;
        case 3:
            return ps1;
        default:
            throw new Error("Machine not found");



    }
}


export {
    getMachinePicture
}