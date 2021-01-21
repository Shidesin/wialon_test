import React from 'react';
import style from './TableContainer.module.css'
import {ItemRoute} from "./ItemRoute/ItemRoute";
import {useSelector} from "react-redux";
import {allDataCoordinateState, getWayLength} from "../selectors/appSelector";

export const TableContainer = () => {

    const dataForTable = useSelector(allDataCoordinateState)
    const wayLength = useSelector(getWayLength)

    let startNumder = 1;

    return (
        <div className={style.tableContainer}>

            <div className={style.itemRoutecontainer}>
                <div className={style.number}>№</div>
                <div className={style.coordinate}>Координаты</div>
                <div className={style.address}>Адрес</div>
                <div className={style.distance}>Путь, км</div>
            </div>

            <div className={style.fixedBox}>
                {dataForTable.map((item) => <ItemRoute number={startNumder++} key={item.date} item={item}/>)}
            </div>

            <div className={style.itemResult}>
                <span>Итого расстояние: </span><span>{wayLength} км</span>
            </div>
        </div>

    )
};


