import React, { SetStateAction } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table } from '../Components';
import { useSelector, useDispatch } from "react-redux"
import { GamesInterface, setGames } from '../redux/slice/gamesSlice';
import { useTranslation } from 'react-multi-lang';


export default function Home() {
    const t = useTranslation();
    const navigate = useNavigate();
    //RECUPERATION DE LISTE DE JEUX POUR CARTE MERE H3 3D FASHION

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(undefined);


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
                    {/* BTN ADD GAME */}
                    <Link to="/addGame">
                        <button className="btnAddGame">{t("home.addGame")}</button>
                    </Link>
                    {/* BTN BACKUP ALL GAME SD CARD */}

                    <button onClick={() => handleBackupGameSdCard()}
                        className="btnBackup">{t("home.addGameSdCardInLib")}</button>

                </div>

                <Table

                    onRowClick={(row: GamesInterface) => {
                        navigate('/EditGameInfo', { state: { rowData: row } });
                    }}
                />

            </div>
    );

}