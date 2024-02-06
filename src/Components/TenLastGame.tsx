import { useEffect, useState } from "react"
import { libGameInterface } from "./RandomGame";
import { useTranslation } from "react-multi-lang";


const TenLastGame = () => {

    const [tenLastGames, setTenLastGames] = useState<libGameInterface[] | null>(null);
    const ADREESE_API = "http://83.198.193.155:8080/api/";
    const t = useTranslation();

    useEffect(() => {

        if (tenLastGames !== null) {
            return;
        } else {
            handleGetTenLastGame();

        }



    }, [tenLastGames])


    const handleGetTenLastGame = async () => {
        if (tenLastGames !== null) {
            return;
        }

        const result = await fetch(ADREESE_API + "lib/lastEntry");
        const data = await result.json();
        if (data.success) {

            setTenLastGames(data.data);
        } else {

            console.log(data.message);
        }
    }

    if (tenLastGames === undefined) {

        return <div>{t("global.loading")}</div>

    }

    return (
        <div className="tenLastGame">
            <h1 className="tenLastGame_title">{t("tenLastGame.title")}</h1>

            {
                tenLastGames?.map((game: libGameInterface, index) => {
                    return (

                        <button>
                            <h2>{game.title_en}</h2>
                            <img src={game.screenshots} alt={game.title_en} />

                        </button>
                    )
                })

            }
        </div>
    )



}

export default TenLastGame;