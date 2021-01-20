import React, {useEffect, useState} from 'react';
import style from './СoordinateFormComponent.module.css'
import {useSelector} from "react-redux";
import {getCoordinateForForm} from "../selectors/appSelector";
import {ButtonGeoCoding} from "../Button/ButtonGeoCoding";


export const CoordinateFormComponent = () => {

    const geocodeCoordinate = useSelector(getCoordinateForForm);

    const [currentAddress, setCurrentAddress] = useState(null)

    const getAddress = (coords) => {
        window.ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            setCurrentAddress(firstGeoObject.getAddressLine())
        });
    }

    useEffect(() => {
        if (geocodeCoordinate.length > 0) {
            getAddress(geocodeCoordinate)
        }
    }, [geocodeCoordinate])

    return (
        <div className={style.main_box}>

            <div className={style.geoData_box}>
                <div className={style.main_box_display}>
                    {geocodeCoordinate && geocodeCoordinate[0]}
                </div>

                <div className={style.main_box_display}>
                    {geocodeCoordinate && geocodeCoordinate[1]}
                </div>

                <div className={style.main_box_display}>
                    {currentAddress}
                </div>
            </div>
            <div className={style.button_box}>
                <ButtonGeoCoding currentAddress={currentAddress}/>
            </div>

        </div>
    )
}


