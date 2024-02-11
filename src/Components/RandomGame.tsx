import { useEffect, useState } from "react";
import { useTranslation } from "react-multi-lang";
interface libGameInterface {

    pid: number;
    mp4name: string;
    romname: string;
    pinyin: string;
    title_cn: string;
    title_en: string;
    title_ko: string;
    title_es: string;
    title_jp: string;
    title_tw: string;
    is_show: boolean;
    is_favourite: boolean;
    dim_type: number;
    is_timer: boolean;
    load_time: number;
    category: number;
    resname: string;
    open_time: number;
    update_time: number;
    emu_id: number;
    emu_name: number | null;
    level: number;
    life: number;
    screenshots: string;
    remark: number | null;
    is_comb: boolean;

}


const RandomGame = () => {

    const [games, setGames] = useState<libGameInterface[]>([]);
    const ADREESE_API = "http://83.198.193.155:8080/api/";
    const [loading, setLoading] = useState(false);
    const t = useTranslation();
    useEffect(() => {
        if (games.length > 0 || loading) {
            return;
        } else {
            setLoading(true);
            handleRandomGame();

        }


    }, [games])

    const handleRandomGame = async () => {
        if (games.length > 0 || loading) {
            return;
        }
        try {
            const response = await fetch(ADREESE_API + "lib/randomGame");
            const data = await response.json();

            if (data.success) {

                setGames(data.data);

            } else {

                console.log(data.message);
            }
            setLoading(false);
        } catch (error) {

            console.log(error);
        }
    }

    if (games === undefined) {

        return <div>Loading...</div>

    }

    return (
        <div className="randomGame">
            <h2 className="title">{t("randomGame.title")}</h2>
            <div className="randomGame__contenaire">
                {
                    games?.map((game: libGameInterface, index) => {
                        return (
                            <div>

                                <img src={convertImageUrl(game.screenshots)} alt={game.title_en} />
                                <h3>{game.title_en}</h3>
                            </div>
                        )
                    })

                }
            </div>

            <small>{t("randomGame.desc")}</small>
        </div >
    )




}

function convertImageUrl(originalUrl: string) {
    // Utilisation d'une expression régulière pour effectuer la conversion
    return originalUrl.replace('/t_thumb/', '/t_cover_big/');
}

export type { libGameInterface };
export default RandomGame;
