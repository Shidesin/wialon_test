import {TableContainer} from "../TableContainer/TableContainer";
import {MapBox} from "../MapBox/MapBox";
import React from "react";
import style from './ContentBox.module.css'

export const ContentBox = () => {
    return (
        <div className={style.contentBox}>
            <TableContainer/>
            <MapBox/>
        </div>
    )
}