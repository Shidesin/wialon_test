import React from "react";
import style from './ButtonGeoCoding.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getCoordinateForRoute, lastCoordinateValueSelector} from "../selectors/appSelector";
import {setCoordinateState, setWayLength} from "../redux/coordinateDataState-reducer";
import {createPopupWindow} from "../Popup/PopupCustom";


export const ButtonGeoCoding = React.memo(({currentAddress}) => {

    const dispatch = useDispatch();

    const dataCoordForRoute = useSelector(getCoordinateForRoute);
    const lastCoordinateFromState = useSelector(lastCoordinateValueSelector)

    const getDistance = (coordForRoute, currentAddress) => {

        if (coordForRoute && coordForRoute.length === 1) {
            let finalData = {
                coordinates: coordForRoute[0],
                address: currentAddress,
                date: `${new Date().toDateString()}, ${new Date().toLocaleTimeString()}`,
                distance: '0',
            };
            dispatch(setCoordinateState(finalData))
            createPopupWindow(finalData.coordinates, finalData.address, finalData.date, finalData.distance)

        } else if (coordForRoute && coordForRoute.length > 1) {

            let multiRoute = new window.ymaps.multiRouter.MultiRoute(
                {
                    referencePoints: coordForRoute,
                    params: {result: 1}
                }
            );

            multiRoute.model.events.add('requestsuccess', function () {
                let activeRoute = multiRoute.getActiveRoute();
                let activeRoutePaths = activeRoute.getPaths();

                activeRoutePaths.each(async function (path) {
                    let distance = await path.properties.get("distance").text;
                    let finalData = {
                        coordinates: coordForRoute[1],
                        address: currentAddress,
                        date: `${new Date().toDateString()}, ${new Date().toLocaleTimeString()}`,
                        distance: distance,
                    };
                    dispatch(setCoordinateState(finalData))
                    dispatch(setWayLength(distance))
                    createPopupWindow(finalData.coordinates, finalData.address, finalData.date, finalData.distance, finalData.duration)

                });
                multiRoute.destroy();
            });
        }
    }

    const buttonDisable = (currentData, lastData) => {

        if (currentData.length === 0 && lastData.length === 0) {
            return false
        } else if (currentData.length !== 0 && lastData.length === 0) {
            return false
        } else if (currentData.slice(-1)[0][0] === lastData[0].coordinates[0]) {
            return true
        } else if (currentData.slice(-1)[0][0] !== lastData[0].coordinates[0]) {
            return false
        }
    }

    const buttonHandler = () => {
        if (dataCoordForRoute && dataCoordForRoute.length === 0) {
            alert('Нет данных!')
        } else {
            getDistance(dataCoordForRoute, currentAddress)
        }
    }

    return (

        <button className={style.button_style} onClick={buttonHandler}
                disabled={buttonDisable(dataCoordForRoute, lastCoordinateFromState)}
        >
            Отправить
        </button>
    )
})