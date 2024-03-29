import { useEffect, useState } from "react"
import { libGameInterface } from "./RandomGame"
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
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux"
import { setGames, selectGames } from "../redux/slice/gamesLibSlice";



interface ModalInfoGameLibProps {
    _data: libGameInterface
    _isVisible: boolean
    _onClose: () => void
}


const ModalInfoGameLib = ({ _data, _isVisible, _onClose }: ModalInfoGameLibProps) => {
    const [data, setData] = useState<libGameInterface>({} as libGameInterface);
    const [loading, setLoading] = useState(false);

    const [isVisible, setIsVisible] = useState(_isVisible)
    const BASE_VIDEO_URL = 'http://83.198.193.155:8080/video/';
    const BASE_API_URL = "http://83.198.193.155:8080/api/";
    const dispatch = useDispatch()


    useEffect(() => {
        setIsVisible(_isVisible);
        setData(_data);

        console.log("ModalInfoGameLibProps", _data, _isVisible, _onClose);

        addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                setIsVisible(false);
                _onClose();
            }
        });

        return () => {
            removeEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    setIsVisible(false);
                    _onClose();

                }
            });
        }

    }, [data, _isVisible, _onClose]);



    const getEmuName = (emu_id: number) => {
        switch (emu_id) {
            case 10:
                return "Mega Drive";
            case 6:
                return "Nes";
            case 7:
                return "Snes";
            case 4:
                return "N64";
            case 8:
                return "Gba";
            case 9:
                return "Gbc";
            case 0:
                return "Neo Geo";
            case 12:
                return "Pc Engine";
            case 3:
                return "Ps1";
            case 101:
                return "Arcade";
            case 2:
                return "Arcade";
            default:
                return "Mega Drive";
        }
    }
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

    const handleScrapPicture = async () => {
        if (loading) return;
        setLoading(true);
        const response = await fetch(BASE_API_URL + 'scrapScrennshot/' + data.emu_id);
        const dataApi = await response.json();
        if (dataApi.success) {
            console.log("dataApi", dataApi);
            /*  alert("Picture scrapped"); */
            setData(dataApi.data);
            setLoading(false);

            /* const games: libGameInterface[] = useSelector(selectGames); */

            /*   games.map((game: libGameInterface, index) => {
                  if (game.pid === data.pid) {
                      game.screenshots = dataApi.data.screenshots;
                    
                      return/ dispatch(setGames(games)); 
                  }
  
  
                  if (index === games.length - 1) {
                      console.error("le jeu renvoyer par l'api nes pas present dans le store redux");
                      alert("Error to scrap picture");
                  }
              }) */


            /*  dispatch(setGames(dataApi.data.games)); */
        } else {
            alert("Error to scrap picture");
        }

    };

    if (!isVisible) {
        return null;
    }

    return (

        <div className="modalLibInfoGame">
            <div className="modalLibInfoGame__header" >
                <h1 className="modalLibInfoGame__header_title">{data.title_en}</h1>
                <button className="modalLibInfoGame__header_btlCloseModal" onClick={
                    () => {
                        setIsVisible(false);
                    }

                }>X</button>

            </div>
            <div className="modalLibInfoGame__body">
                <div className="modalLibInfoGame__body_cover">
                    <img src={data.screenshots} alt={data.title_en + '_picture'} />
                    <button
                        onClick={
                            () => {
                                handleScrapPicture();
                            }
                        }
                    >Scrap picture</button>

                </div>
                <span className="modalLibInfoGame__body_machine">
                    <p>{getEmuName(data.emu_id)}</p>
                    <img src={handleSelectIconMachine(data.emu_id)} alt={data.title_en + '_icon_machine'} />
                </span>
                <VideoPlayer url={BASE_VIDEO_URL + data.mp4name + '.mp4'} />


            </div>
        </div>
    )


}

type VideoPlayerProps = {
    url: string;
};
const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {

    const t = useTranslation();
    return (
        <div className="modalLibInfoGame__video">
            <h2>{t("videoPlayer.title")}</h2>
            <video width="640" height="360" controls>
                <source src={url} />
                {t("videoPlayer.notSupportTag")}
            </video>

        </div>
    );
};

export default ModalInfoGameLib;
export type { ModalInfoGameLibProps }