import React, { useEffect, useState } from "react";
import { GamesInterface, setGames } from "../redux/slice/gamesSlice";
import { Store } from "react-notifications-component";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-multi-lang";
import { MdDeleteForever } from "react-icons/md";
import { LiaEyeSolid } from "react-icons/lia";
import Alert, { AlertProps, defaultAlertProps } from "./Alert";
import EditGameInfo, {
  EditGameInfoProps,
  defaultDataEdit,
} from "./EditGameInfo";
import {
  fav,
  noFav,
  show,
  noShow,
  megaDrive,
  nes,
  snes,
  n64,
  gba,
  gbc,
  neoGeo,
  pcEngine,
  ps1,
  arcade,
  conbatGroupe,
  puzzle,
  shootEmUp,
  shoot,
  sport,
  versus,
} from "../assets/img";
import { Link } from "react-router-dom";
import Search from "./Search";
import Filter from "./Filter";

type SpecialColumnProps = {
  keyColumn: string;
  row: GamesInterface;
  index: number;
};

export default function Table() {
  const [data, setData] = useState<GamesInterface[]>(
    useSelector((state: any) => state.Games.games)
  );
  const dispatch = useDispatch();
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 50,
    totalPages: 0,
  });
  const [loading, setLoading] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);
  const [alert, setAlert] = React.useState<AlertProps>(defaultAlertProps);
  const [editGameInfo, setEditGameInfo] =
    React.useState<EditGameInfoProps>(defaultDataEdit);
  const ADREESE_API = "http://83.198.193.155:8080/api/";

  const t = useTranslation();
  const title = t("table.title");

  useEffect(() => {
    setData(data);
    if (data.length === 0) {
      handlegetGameList(pagination.page);
    }
  }, []);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    if (value === "") return setData(data);
    if (value.length < 3) return;

    try {
      const response = await fetch(`${ADREESE_API}findGame/${value}`);
      const json = await response.json();
      if (json.success) {
        setData(json.data.games);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  const handleClickRow = (row: GamesInterface) => {
    if (alert.isShowAlert || editGameInfo.isShow) return;

    setEditGameInfo({
      ...defaultDataEdit,
      isShow: true,
      rowData: row,
    });
  };

  const handlegetGameList = async (p: number) => {
    if (isFilter) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${ADREESE_API}gameList/` + p + "/" + pagination.limit
      );
      const json = await response.json();
      if (json.success) {
        setPagination({
          page: p,
          limit: pagination.limit,
          totalPages: json.data.totalPages,
        });
        const newData = [...data, ...json.data.games];
        dispatch(setGames(newData));
        setData(newData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const columns = [
    { key: "action", title: "action" },
    { key: "emu_id", title: "emu_id" },
    /*   { key: 'pid', title: 'pid' }, */
    /*      { key: 'mp4name', title: 'mp4name' },
             { key: 'romname', title: 'romname' }, */
    /*  { key: 'pinyin', title: 'pinyin' },
         { key: 'title_cn', title: 'title_cn' }, */
    { key: "title_en", title: "title_en" },
    /* { key: 'title_ko', title: 'title_ko' },
        { key: 'title_es', title: 'title_es' },
        { key: 'title_jp', title: 'title_jp' },
        { key: 'title_tw', title: 'title_tw' }, */
    { key: "is_show", title: "is_show" },
    { key: "is_favourite", title: "is_favourite" },
    { key: "dim_type", title: "dim_type" },
    /*    { key: 'is_timer', title: 'is_timer' }, */
    /*   { key: 'load_time', title: 'load_time' }, */
    { key: "category", title: "category" },
    /*      { key: 'resname', title: 'resname' }, */
    /*     { key: 'open_time', title: 'open_time' },
            { key: 'update_time', title: 'update_time' }, */
    /*    { key: 'emu_name', title: 'emu_name' }, */
    /*   { key: 'level', title: 'level' },
          { key: 'life', title: 'life' }, */
    /*   { key: 'remark', title: 'remark' }, */
    /*  { key: 'is_comb', title: 'is_comb' }, */
  ];
  const SpecilaColumn = ({ keyColumn, row, index }: SpecialColumnProps) => {
    const iconMachine = (value: string | number | boolean | null) => {
      const emu_id =
        typeof value === "number" ? value : parseInt(value as string, 10);
      switch (emu_id) {
        case 10:
          return megaDrive;
        case 6:
          return nes;
        case 7:
          return snes;
        case 4:
          return n64;
        case 8:
          return gba;
        case 9:
          return gbc;
        case 0:
          return neoGeo;
        case 12:
          return pcEngine;
        case 3:
          return ps1;
        case 101:
          return arcade;
        case 2:
          return arcade;
        default:
          return megaDrive;
      }
    };

    const iconCategory = (value: string | number | boolean | null) => {
      const category =
        typeof value === "number" ? value : parseInt(value as string, 10);
      switch (category) {
        case 4:
          return conbatGroupe;
        case 5:
          return puzzle;
        case 2:
          return shootEmUp;
        case 3:
          return shoot;
        case 6:
          return sport;
        case 1:
          return versus;
        default:
          return conbatGroupe;
      }
    };

    switch (keyColumn) {
      case "emu_id":
        return (
          <td key={keyColumn + index + row.pid}>
            <img
              src={iconMachine(row[keyColumn as keyof GamesInterface])}
              alt=""
              width={50}
            />
          </td>
        );
      case "category":
        return (
          <td key={keyColumn + index + row.pid}>
            <img
              src={iconCategory(row[keyColumn as keyof GamesInterface])}
              alt=""
              width={50}
            />
          </td>
        );
      case "is_show":
        return (
          <td key={keyColumn + index + row.pid}>
            <img
              src={row[keyColumn as keyof GamesInterface] ? show : noShow}
              alt=""
              width={50}
              onClick={() => handleSetIsShow(row)}
            />
            {/* <LiaEyeSolid
              onClick={() => handleSetIsShow(row)}
            /> */}
          </td>
        );
      case "is_favourite":
        return (
          <td key={keyColumn + index + row.pid}>
            <img
              src={row[keyColumn as keyof GamesInterface] ? fav : noFav}
              alt=""
              width={50}
              onClick={() => handleSetIsFav(row)}
            />
          </td>
        );
      case "action":
        return (
          <td
            className="clickable"
            onClick={() =>
              setAlert({
                ...defaultAlertProps,
                isShowAlert: editGameInfo.isShow ? false : true,
                title: "notif.deleteGame.alert.title",
                message: "notif.deleteGame.alert.message",
                submit: () => handleDelete(row),
                cancel: () => {
                  setAlert(defaultAlertProps);
                },
              })
            }
          >
            <MdDeleteForever className="table-icon" />
          </td>
        );
      case "title_en":
        return (
          <td
            className="clickable"
            key={keyColumn + index + row.pid}
            onClick={() => handleClickRow(row)}
          >
            {row[keyColumn as keyof GamesInterface]}
          </td>
        );
      default:
        return (
          <td className="clickable" key={keyColumn + index + row.pid}>
            {row[keyColumn as keyof GamesInterface]}
          </td>
        );
    }
  };

  const handleDelete = (row: GamesInterface) => {
    Store.addNotification({
      title: t("notif.deleteGame.standby.title"),
      message: t("notif.deleteGame.standby.message"),
      type: "info",
      insert: "top",
      container: "top-right",
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });

    fetch(`${ADREESE_API}deleteGame/${row.pid}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((_data) => {
        if (_data.success) {
          const newData = data.filter((item) => item.pid !== row.pid);
          dispatch(setGames(newData));
          Store.addNotification({
            title: t("notif.deleteGame.success.title"),
            message: t("notif.deleteGame.success.message"),
            type: "success",
            insert: "top",
            container: "top-right",
            dismiss: {
              duration: 3000,
              onScreen: true,
            },
          });
        } else {
          Store.addNotification({
            title: t("notif.deleteGame.error.title"),
            message: t("notif.deleteGame.error.message"),
            type: "danger",
            insert: "top",
            container: "top-right",
            dismiss: {
              duration: 3000,
              onScreen: true,
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const scrollDection = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (loading) return;
    const target = event.target as HTMLDivElement;

    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      if (pagination.page < pagination.totalPages) {
        const p = pagination.page + 1;

        handlegetGameList(p);
      }
    }
  };

  const handleSetIsShow = async (row: GamesInterface) => {
    if (alert.isShowAlert || editGameInfo.isShow) return;

    const is_show = !row.is_show;
    try {
      const response = await fetch(
        `${ADREESE_API}setIsShow/` + row.pid + "/" + is_show
      );
      const json = await response.json();
      if (json.success) {
        const newData = data.map((item) => {
          if (item.pid === row.pid) {
            item = { ...item, is_show: is_show };
          }

          return item;
        });
        Store.addNotification({
          title: t("notif.setIsShow.success.title"),
          message: t("notif.setIsShow.success.message"),
          type: "success",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
        setData(newData);
      } else {
        Store.addNotification({
          title: t("notif.setIsShow.error.title"),
          message: t("notif.setIsShow.error.message"),
          type: "danger",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const handleSetIsFav = async (row: GamesInterface) => {
    if (alert.isShowAlert || editGameInfo.isShow) return;

    const is_favourite = !row.is_favourite;
    try {
      const response = await fetch(
        `${ADREESE_API}setIsFav/` + row.pid + "/" + is_favourite
      );
      const json = await response.json();
      if (json.success) {
        const newData = data.map((item) => {
          if (item.pid === row.pid) {
            item = { ...item, is_favourite: is_favourite };
          }

          return item;
        });
        Store.addNotification({
          title: t("notif.setIsFavourite.success.title"),
          message: t("notif.setIsFavourite.success.message"),
          type: "success",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
        setData(newData);
      } else {
        Store.addNotification({
          title: t("notif.setIsFavourite.error.title"),
          message: t("notif.setIsFavourite.error.message"),
          type: "danger",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return (
    <div className="tableGame">
      <h1 className="tableGame__title">{title}</h1>

      <div>
        <Filter
          urlApiFilter={`${ADREESE_API}filterGame/`}
          data={(value) => {
            setData(value);
            /* setIsFilter(true); */
          }}
          setIsFilter={(f) => setIsFilter(f)}
        />
        <Search
          placeholder={t("table.search.placeholder")}
          outPut={(value) => handleSearch(value)}
        />
      </div>
            <div>
                <Filter
                    urlApiFilter={`${ADREESE_API}filterGame/`}
                    data={(value) => {
                        setData(value);
                        /* setIsFilter(true); */
                    }}
                    setIsFilter={(f) => setIsFilter(f)}
                />
                <div>
                    <Search
                        placeholder={t("table.search.placeholder")}
                        outPut={(value) => handleSearch(value)}
                    />
                    <Link to="/addGame">
                        <button className="btnAddGame">{t("home.addGame")}</button>
                    </Link>
                </div>
            </div>

      <div className="tableGame__content">
        {" "}
        {/* BTN ADD GAME */}
        <Link to="/addGame">
          <button className="btnAddGame">{t("home.addGame")}</button>
        </Link>
        <table className="tableGame__content_table">
          <thead>
            <tr>
              {columns.map((column, index) =>
                index === 0 ? (
                  <th key={"action"}>{t("table.rows.action")}</th>
                ) : (
                  <th key={column.key}>{t(`table.rows.${column.title}`)}</th>
                )
              )}
            </tr>
          </thead>
          <tbody
            onScroll={(event) => {
              scrollDection(event);
            }}
          >
            {data.map((row) => (
              <tr key={row.pid} /* onClick={() => onRowClick(row)} */>
                {columns.map((column, index) => (
                  <SpecilaColumn
                    key={index + "lstC"}
                    index={index}
                    keyColumn={column.key}
                    row={row}
                  />
                ))}
              </tr>
            ))}
            {loading ? (
              <tr>
                <td>{t("global.loading")}</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <Alert
        isShowAlert={alert.isShowAlert}
        typeMachine={0}
        title={t(alert.title)}
        message={t(alert.message)}
        submit={() => {
          alert.submit();
        }}
        cancel={() => {
          alert.cancel();
        }}
      />
      <EditGameInfo
        isShow={editGameInfo.isShow}
        rowData={editGameInfo.rowData}
        onClose={() => setEditGameInfo(defaultDataEdit)}
      />
    </div>
  );

            <div>  {/* BTN ADD GAME */}

                <table>
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                index === 0 ? <th key={"action"} >{t("table.rows.action")}</th> :
                                    <th key={column.key}>{t(`table.rows.${column.title}`)}</th>

                            ))}
                        </tr>

                    </thead>
                    <tbody onScroll={
                        (event) => {
                            scrollDection(event);
                        }
                    }>
                        {data.map((row) => (

                            <tr key={row.pid} /* onClick={() => onRowClick(row)} */>

                                {columns.map((column, index) => (
                                    <SpecilaColumn key={index + "lstC"} index={index} keyColumn={column.key} row={row} />
                                ))}
                            </tr>



                        ))}
                        {
                            loading ? <tr><td>{t("global.loading")}</td></tr> : null
                        }
                    </tbody>
                </table>
            </div>
            <Alert
                isShowAlert={alert.isShowAlert}
                typeMachine={0}
                title={t(alert.title)}
                message={t(alert.message)}
                submit={() => { alert.submit() }}
                cancel={() => { alert.cancel() }}
            />
            <EditGameInfo
                isShow={editGameInfo.isShow}
                rowData={editGameInfo.rowData}
                onClose={() => setEditGameInfo(defaultDataEdit)}
            />
        </div>
    );
}
