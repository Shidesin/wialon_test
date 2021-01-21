import React from "react";
import style from './ItemRoute.module.css'

export const ItemRoute = React.memo((props) => {

    const {coordinates,address, distance} = props['item'];

    return (
        <div className={style.itemRoutecontainer}>
            <div className={style.number}>{props.number}</div>

            <div className={style.coordinate}>
                <div>lat: {coordinates[0].slice(0, 10)}</div>
                <div>lng: {coordinates[1].slice(0, 10)}</div>
            </div>

            <div className={style.address}>{address}</div>
            <div className={style.distance}>{distance}</div>
        </div>
    )
})