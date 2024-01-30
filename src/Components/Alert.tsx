import React, { useCallback, useEffect } from "react";
import { getMachinePicture } from "../function/machine";
import { useTranslation } from "react-multi-lang";
import "../assets/css/alert.css";
import exp from "constants";

interface AlertProps {
    message: string;
    title: string;
    submit: () => void;
    cancel: () => void;
    typeMachine: number;
    isShowAlert: boolean;

}


const Alert: React.FC<AlertProps> = ({ isShowAlert, typeMachine, title, message, cancel, submit }) => {



    /*     useEffect(() => {
    
        }, [isShowAlert]); */



    if (!isShowAlert) {
        return null;
    }

    const t = useTranslation();
    return (
        <div className="alert">
            <div className="alert__content">
                <div className="alert__image">
                    <img src={getMachinePicture(typeMachine)} alt="machine" />
                </div>
                <div className="alert__title">{t(title)}</div>
                <div className="alert__message">{t(message)}</div>
                <div className="alert__buttons">
                    <button className="alert__button" onClick={cancel}>
                        {t("global.buttons.cancel")}
                    </button>
                    <button className="alert__button" onClick={submit}>
                        {t("global.buttons.yes")}
                    </button>
                </div>
            </div>
        </div>
    );
};

const defaultAlertProps: AlertProps = {
    message: "",
    title: "",
    submit: () => { },
    cancel: () => { },
    typeMachine: 0,
    isShowAlert: false
};


export default Alert;
export { defaultAlertProps };
export type { AlertProps };
