import { useEffect, useState } from "react";
import Search from "./Search";
import { useTranslation } from "react-multi-lang";
import { libGameInterface } from "./RandomGame";
import { useDispatch, useSelector } from "react-redux"
import { setGames } from "../redux/slice/gamesLibSlice";

interface LibGameListInterface {
    data: libGameInterface[]
}

const LibGameList = ({ data }: LibGameListInterface) => {

    const [libGameList, setLibGameList] = useState<libGameInterface[]>(data);
    const t = useTranslation();
    const ADREESE_API = "http://83.198.193.155:8080/api/";
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const EMPTY_SCREEN_SHOT = "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
    const dispatch = useDispatch()

    useEffect(() => {
        setLibGameList(data);
    }, [data]);


    if (libGameList?.length == 0) {
        console.log("loading", libGameList.length);
        return <div>{t("global.loading")}</div>

    }
    console.log("libGameList", libGameList.length);
    return (
        <div>
            <h3>Game List</h3>


            <div>
                {
                    libGameList.map((game: libGameInterface, index) => {
                        return (
                            <button key={index + game.title_en}>
                                <h2>{game.title_en}</h2>
                                <img src={
                                    game.screenshots ? game.screenshots : EMPTY_SCREEN_SHOT
                                }
                                    alt={game.title_en}
                                    width={80}
                                    height={80}

                                />
                            </button>
                        )
                    })
                }
            </div>

        </div>
    );



};


export default LibGameList;
