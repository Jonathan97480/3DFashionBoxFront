import { useEffect, useState } from "react";
import Search from "./Search";
import { useTranslation } from "react-multi-lang";
import { libGameInterface } from "./RandomGame";

const LibGameList = () => {

    const [libGameList, setLibGameList] = useState<libGameInterface[]>([]);
    const t = useTranslation();
    const ADREESE_API = "http://83.198.193.155:8080/api/";
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [pagination, setPagination] = useState({ page: 1, limit: 10 });
    const EMPTY_SCREEN_SHOT = "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"

    useEffect(() => {
        handleGetLibGameList();
    }, [pagination.page])



    const handleGetLibGameList = async () => {


        const result = await fetch(ADREESE_API + `lib/gameLibList/${pagination.page}/${pagination.limit}`);
        const data = await result.json();

        if (data.success) {
            console.log(data.data);
            setLibGameList(data.data.games);
        } else {

            console.log(data.message);
        }
    };


    if (libGameList?.length == 0) {
        console.log("loading", libGameList.length);
        return <div>{t("global.loading")}</div>

    }
    console.log("libGameList", libGameList.length);
    return (
        <div>
            <h3>Game List</h3>

            <Search
                placeholder="Search Game"
                outPut={() => {
                    console.log("searching game")

                }}
            />
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
            <div>
                {/* pagination */}
                <button onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}>prev</button>
                <button onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}>next</button>



            </div>

        </div>
    );



};


export default LibGameList;
