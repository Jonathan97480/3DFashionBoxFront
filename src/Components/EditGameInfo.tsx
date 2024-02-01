import React, { useState, useLayoutEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { GamesInterface } from "../redux/slice/gamesSlice";
import { Store } from "react-notifications-component";



export type EditGameInfoProps = {
    rowData: GamesInterface;
    isShow: boolean;
    onClose: () => void;

};


const defaultDataEdit: EditGameInfoProps = {
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
    onClose: () => {
        console.log("close");
    }

}



export default function EditGameInfo({ rowData, isShow, onClose }: EditGameInfoProps) {


    const [data, setData] = useState<GamesInterface>(rowData);
    const [video, setVideo] = useState<string>("");
    const t = useTranslation();
    const BASE_VIDEO_URL = '"http://83.198.193.155:8080/video/';
    const BASE_API_URL = "http://83.198.193.155:8080/api/";



    useLayoutEffect(() => {

        if (video != `${BASE_VIDEO_URL}${rowData.mp4name}.mp4`) {
            setVideo(`${BASE_VIDEO_URL}${rowData.mp4name}.mp4`);
        }

        setData(rowData);

    }, [video, rowData.mp4name])



    const handleDataChange = (key: string, value: string | number | boolean) => {
        setData((prevData) => ({ ...prevData, [key]: value }));
    }

    const checkIsArcadeGame = (emu_id: number) => {

        if (emu_id === 0 || emu_id == 101) {
            return true;
        }
        return false;

    }

    /* Data UPDATE IN API */
    const handleUpdateVideo = async (file: File) => {
        const newFormData = new FormData();
        newFormData.append('video', file);

        const result = await fetchData(`${BASE_API_URL}updateVideo/${rowData.pid}`, {
            method: 'POST',
            body: newFormData
        })

        if (!result.error) {
            setVideo("");
            /* update view video player  */

        } else {
            alert('video not updated');
            console.error(result.error.message);
        }
    }

    const handleUpdateData = async () => {


        const result = await fetchData(`${BASE_API_URL}updateGame`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!result.error) {
            alert('data updated');
        } else {
            alert('data not updated');
            console.error(result.error.message);
        }
    }

    const checISDataAndRawDataEqual = () => {
        return Object.keys(data).every(key => data[key as keyof GamesInterface] === rowData[key as keyof GamesInterface]);
    };


    if (!isShow) {
        return null;
    }

    async function handleUpdateRomFile(file: File) {
        const newFormData = new FormData();
        newFormData.append('rom', file);

        const result = await fetchData(`${BASE_API_URL}updateRom/${rowData.pid}`, {
            method: 'POST', body: newFormData
        })

        if (!result.error) {
            Store.addNotification({
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
        } else {

            Store.addNotification({
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
    }

    return (

        <div className="modal">
            <h1> {data.title_en} </h1>
            <div className="modal_contenair">
                <div className="left-side">

                    <span>
                        <label>{t("namegame")}</label>
                        <input type="text" name="title_en" value={data.title_en} onChange={(e) => handleDataChange("title_en", e.target.value)} />
                    </span>
                    <span>
                        <label>{t("category.title")}</label>
                        <select name="category" value={data.category} onChange={(e) => handleDataChange("category", e.target.value)}>
                            <option value="0">{t("category.list.0")}</option>
                            <option value='1'>{t("category.list.1")}</option>
                            <option value="2">{t("category.list.2")} </option>
                            <option value="3">{t("category.list.3")}</option>
                            <option value="5">{t("category.list..5")}</option>
                            <option value="6">{t("category.list.6")}</option>
                        </select>
                    </span>
                    <span>
                        <button
                            onClick={() => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = '.zip,.md,.nes,.smc,.sfc,.gb,.gbc,.gba,.bin,.iso';
                                input.click();
                                /* get input change value */
                                input.addEventListener('input', (event: any) => {
                                    const file = event.target.files[0];
                                    handleUpdateRomFile(file);
                                })

                            }}

                        >{t("global.buttons.updateRom")}</button>


                    </span>
                    {checkIsArcadeGame(data.emu_id) ? <div className="advanced-options">

                        <span>
                            <label>{t("global.game.loadTime")}</label>
                            <input type="text" value={data.load_time} onChange={(e) => handleDataChange("load_time", e.target.value)} placeholder={t("global.game.placeholderLoadTime")} />
                        </span>
                        <span>
                            <label>{t("global.game.gameTime")}</label>
                            <input type="text" value={data.open_time} onChange={(e) => handleDataChange("open_time", e.target.value)} placeholder={t("global.game.placeholderTime")} />
                        </span>
                        <span>
                            <label>{t("global.game.dificulty")} </label>
                            <input type="text" value={data.level} onChange={(e) => handleDataChange("level", e.target.value)} placeholder={t("global.game.placeholderDificulty")} />
                        </span>
                        <span>
                            <label>{t("global.game.numberCredit")} </label>
                            <input type="text" value={data.life} onChange={(e) => handleDataChange("life", e.target.value)} placeholder={t("global.game.placeholderNumberCredit")} />
                        </span>
                        <span>
                            <label>{t("global.game.titleGameOtherLang")} </label>
                            <span>
                                <input type="text" value={data.title_jp} onChange={(e) => handleDataChange("title_jp", e.target.value)} placeholder={t("global.game.placeholderJapan")} />
                                <input type="text" value={data.title_cn} onChange={(e) => handleDataChange("title_cn", e.target.value)} placeholder={t("global.game.placeholderChinese")} />
                                <input type="text" value={data.title_tw} onChange={(e) => handleDataChange("title_tw", e.target.value)} placeholder={t("global.game.placeholderTaiwan")} />
                                <input type="text" value={data.title_ko} onChange={(e) => handleDataChange("title_ko", e.target.value)} placeholder={t("global.game.placeholderKorean")} />
                                <input type="text" value={data.title_es} onChange={(e) => handleDataChange("title_es", e.target.value)} placeholder={t("global.game.placeholderEspagnol")} />
                            </span>
                        </span>



                    </div> : null}
                    <br /><br />{/* :TODO delete an style make */}
                    <button disabled={checISDataAndRawDataEqual()} onClick={handleUpdateData}>{t("global.buttons.save")}</button>
                </div>
                <div className="right-side">
                    <VideoPlayer url={video} />
                    <button onClick={
                        /* open input file */
                        () => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = '.mp4';
                            input.click();
                            /* get input change value */
                            input.addEventListener('input', (event: any) => {
                                const file = event.target.files[0];
                                handleUpdateVideo(file);
                            })

                        }
                    } >{t("global.buttons.changeVideoDemo")}</button>
                </div>

                <button onClick={() => onClose()}>{t("global.buttons.close")}</button>

            </div>
        </div>

    );
}



type VideoPlayerProps = {
    url: string;
};
const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {

    const t = useTranslation();
    return (
        <div>
            <h2>{t("videoPlayer.title")}</h2>
            <video width="640" height="360" controls>
                <source src={url} />
                {t("videoPlayer.notSupportTag")}
            </video>

        </div>
    );
};

const fetchData = async (url: string, options: RequestInit | undefined) => {
    const response = await fetch(url, options);
    const resultJson = await response.json();

    if (response.ok) {
        return resultJson;
    } else {
        console.error(resultJson.error.message);
        throw new Error('Data not fetched successfully.');
    }
};


export {
    defaultDataEdit
}