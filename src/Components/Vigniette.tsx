import React from 'react';
import megaDrive from '../assets/images/icon/megaDrive.png';
import nes from '../assets/images/icon/nes.png';
import snes from '../assets/images/icon/snes.png';
import n64 from '../assets/images/icon/n64.png';
import gba from '../assets/images/icon/gba.png';
import gbc from '../assets/images/icon/gbc.png';
import neoGeo from '../assets/images/icon/neoGeo.png';
import pcEngine from '../assets/images/icon/pcEngine.png';
import ps1 from '../assets/images/icon/ps1.png';
import arcade from '../assets/images/icon/arcade.png';
interface VignietteProps {
    title: string;
    image: string;
    emu_id: number;
};




const Vigniette = ({ title, image, emu_id }: VignietteProps) => {
    const EMPTY_SCREEN_SHOT = "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"


    const handleSelectIconMachine = (emu_id: number) => {

        switch (emu_id) {
            case 10:
                return megaDrive;
            case 6:
                return nes;
            case 7:
                return snes;
            case 4:
                return n64;
            case 8:
                return gba;
            case 9:
                return gbc;
            case 0:
                return neoGeo;
            case 12:
                return pcEngine;
            case 3:
                return ps1;
            case 101:
                return arcade;
            case 2:
                return arcade;
            default:
                return megaDrive;
        }

    };

    return (
        <div className="vigniette">
            <img src={
                image ? image : EMPTY_SCREEN_SHOT
            } alt={title} />
            <img src={handleSelectIconMachine(emu_id)} alt={title + "_icon"} />
            <h3>{title}</h3>
        </div>
    )


};

export default Vigniette;
export type { VignietteProps };