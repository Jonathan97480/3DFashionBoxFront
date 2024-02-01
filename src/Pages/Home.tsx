import React, { SetStateAction } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Table } from '../Components';
import { useSelector, useDispatch } from "react-redux"
import { GamesInterface, setGames } from '../redux/slice/gamesSlice';
import { useTranslation } from 'react-multi-lang';
import { defaultAlertProps } from '../Components/Alert';
import libGamesPicture from '../assets/images/art/lib_img.png';
import arcadeGamePicture from '../assets/images/art/arcade.jpg';


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
    const navigate = useNavigate();

    return (
        <Table />
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