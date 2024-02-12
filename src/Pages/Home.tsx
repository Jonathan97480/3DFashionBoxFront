import React, { SetStateAction, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Filter, LibGameList, ModalInfoGameLib, RandomGame, Search, Table, TenLastGame } from '../Components';
import { useSelector, useDispatch } from "react-redux"
import { setGames } from '../redux/slice/gamesLibSlice';

import { useTranslation } from 'react-multi-lang';
import { defaultAlertProps } from '../Components/Alert';
import libGamesPicture from '../assets/images/art/lib_img.png';
import arcadeGamePicture from '../assets/images/art/arcade.jpg';
import { libGameInterface } from '../Components/RandomGame';


interface screenInterface {
    screen: "home" | "fashionBoxGames" | "libGames"


}

export default function Home() {
    const t = useTranslation();
    //RECUPERATION DE LISTE DE JEUX POUR CARTE MERE H3 3D FASHION

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(undefined);
    const [alert, setAlert] = React.useState(defaultAlertProps);
    const [screen, setScreen] = React.useState<screenInterface>({ screen: "home" });
    const ADREESE_API = "http://83.198.193.155:8080/api/";





    const handleBackupGameSdCard = async () => {
        setLoading(true);
        try {

            const response = await fetch('http://localhost:8080/api/backupSdCard');
            const json = await response.json();
            if (json.error) {
                setError(json.error);
                return;
            }
            console.log(json);
            setError(undefined);


        } catch (error) {
            setError(error as SetStateAction<undefined>);
        }
        setLoading(false);

    };

    return (

        loading ? <div>{t("global.loading")}</div> :
            <div className="home">
                <div>

                    {/* BTN BACKUP ALL GAME SD CARD */}

                    <button onClick={() => setAlert({
                        ...defaultAlertProps
                        , isShowAlert: true
                        , title: "home.backupSdCard"
                        , message: "home.backupSdCardMessage"
                        , submit: handleBackupGameSdCard,
                        cancel: () => setAlert({ ...defaultAlertProps, isShowAlert: false })
                    })}
                        className="btnBackup">{t("home.addGameSdCardInLib")}</button>

                </div>

                <ScreenSlector screen={screen.screen} setScreen={setScreen} />
                <Alert {...alert} />
            </div>
    );

}

interface ScreenSlectorInterface {
    screen: "home" | "fashionBoxGames" | "libGames"
    setScreen: React.Dispatch<React.SetStateAction<screenInterface>>;
}
const ScreenSlector = ({ screen, setScreen }: ScreenSlectorInterface) => {
    const t = useTranslation();

    switch (screen) {
        case "home":
            return <HomeScreen setScreen={setScreen} />;
        case "fashionBoxGames":
            return <FashionBoxGames />;
        case "libGames":
            return <LibGames />;
        default:
            return <Home />;

    }
}



const FashionBoxGames = () => {
    const navigate = useNavigate();

    return (
        <Table />
    )



}

const LibGames = () => {

    interface modalInfoGameLibInterface {
        data: libGameInterface;
        isVisble: boolean;
        onClose: () => void;
    }

    const navigate = useNavigate();
    const ADREESE_API = "http://83.198.193.155:8080/api/";
    const [isFilter, setIsFilter] = React.useState(false);
    const [data, setData] = React.useState<libGameInterface[]>([]);
    const [modalInfo, setModalInfo] = React.useState<modalInfoGameLibInterface>(
        {
            data: {} as libGameInterface,
            isVisble: false,
            onClose: () => { }
        }
    );
    const [isVisble, setIsVisble] = React.useState(false);
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState({ page: 1, limit: 10 });


    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        if (value === "") return setData(data);
        if (value.length < 3) return;

        try {
            const response = await fetch(`${ADREESE_API}findLibGame/${value}`);
            const json = await response.json();
            if (json.success) {
                setData(json.data.games);
            } else {
                setData([]);

            }


        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    const handleGetLibGameList = async () => {


        const result = await fetch(ADREESE_API + `lib/gameLibList/${pagination.page}/${pagination.limit}`);
        const data = await result.json();

        if (data.success) {
            console.log("lib data Games : ", data.data);
            dispatch(setGames(data.data.games));
            setData(data.data.games);


        } else {

            console.log(data.message);
        }
    };

    React.useEffect(() => {
        handleGetLibGameList();
    }, [pagination, isFilter]);

    return (
        <>
            <RandomGame />
            <TenLastGame />
            <h2 className='title'>Liste des jeux dans la lib</h2>

            <Filter
                urlApiFilter={`${ADREESE_API}filterLibGame/`}
                data={(value) => {
                    dispatch(setGames(value));
                    setData(value);
                }}
                setIsFilter={(f) => setIsFilter(f)}
            />
            <Search
                placeholder="Search Game"
                outPut={(event) => {
                    handleSearch(event);

                }}
            />
            <LibGameList data={data} selectGame={(_game) => {
                setIsVisble(true);
                setModalInfo(
                    {
                        data: _game,
                        isVisble: true,
                        onClose: () => {
                            setModalInfo({ ...modalInfo, isVisble: true });
                            setIsVisble(false);
                        }
                    }
                )

            }
            } />
            <ModalInfoGameLib
                _data={modalInfo.data}
                _isVisible={isVisble}
                _onClose={() => {
                    setIsVisble(false);
                }}
            />

        </>
    )

}


interface HomeScreenInterface {
    setScreen: React.Dispatch<React.SetStateAction<screenInterface>>;
}
const HomeScreen = ({ setScreen }: HomeScreenInterface) => {
    const navigate = useNavigate();

    return (
        <div className="homeScreen">
            <div className='homeScreen_select' >


                <button onClick={
                    () => setScreen({ screen: "libGames" })
                }>
                    <img src={libGamesPicture} alt="lib Game picture" width={160} height={200} />
                </button>
                <button onClick={
                    () => setScreen({ screen: "fashionBoxGames" })
                }>
                    <img src={arcadeGamePicture} alt="arcade Game picture" width={160} height={200} />
                </button>


            </div>
        </div>
    )

}

function dispatch(arg0: { payload: any; type: "Games/setGames"; }) {
    throw new Error('Function not implemented.');
}
