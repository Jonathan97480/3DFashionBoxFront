import { useEffect, useState } from "react";
import Search from "./Search";
import { useTranslation } from "react-multi-lang";
import { libGameInterface } from "./RandomGame";
import { useDispatch, useSelector } from "react-redux"
import { setGames } from "../redux/slice/gamesLibSlice";
import Vigniette from "./Vigniette";

interface LibGameListInterface {
    data: libGameInterface[]
}

const LibGameList = ({ data }: LibGameListInterface) => {

    const [libGameList, setLibGameList] = useState<libGameInterface[]>(data);
    const t = useTranslation();
    const ADREESE_API = "http://83.198.193.155:8080/api/";
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
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
                                <Vigniette title={game.title_en} image={game.screenshots} emu_id={game.emu_id} />
                            </button>
                        )
                    })
                }
            </div>

        </div>
    );



};


export default LibGameList;
