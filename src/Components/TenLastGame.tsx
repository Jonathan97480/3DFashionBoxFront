import { useEffect, useState } from "react"
import { libGameInterface } from "./RandomGame";
import { useTranslation } from "react-multi-lang";
import Vigniette from "./Vigniette";


const TenLastGame = () => {

    const [tenLastGames, setTenLastGames] = useState<libGameInterface[]>([]);
    const ADREESE_API = "http://83.198.193.155:8080/api/";
    const [loading, setLoading] = useState(false);
    const t = useTranslation();

    useEffect(() => {

        if (tenLastGames.length > 0 || loading) {
            return;
        } else {
            setLoading(true);
            handleGetTenLastGame();

        }



    }, [tenLastGames])


    const handleGetTenLastGame = async () => {
        if (tenLastGames.length > 0 || loading) {
            return;
        }

        const result = await fetch(ADREESE_API + "lib/lastEntry");
        const data = await result.json();
        if (data.success) {

            setTenLastGames(data.data);
            if (data.data.length > 0) {
                setLoading(false);
            }

        } else {

            console.log(data.message);

        }
    }

    if (tenLastGames === undefined) {

        return <div>{t("global.loading")}</div>

    }

    return (
        <div className="tenLastGame">
            <h2 className="title">{t("tenLastGame.title")}</h2>
            <div className="tenLastGame__contenaire">
                {
                    tenLastGames?.map((game: libGameInterface, index) => {
                        return (

                            <button>

                                <Vigniette
                                    title={game.title_en}
                                    image={game.screenshots}
                                    emu_id={game.emu_id}
                                />

                            </button>
                        )
                    })

                }
            </div>
        </div>
    )



}

export default TenLastGame;