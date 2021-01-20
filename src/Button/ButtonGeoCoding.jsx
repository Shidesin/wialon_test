import React from "react";
import style from './ButtonGeoCoding.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getCoordinateForRoute} from "../selectors/appSelector";
import {setCoordinateState} from "../redux/coordinateDataState-reducer";
import {createPopupWindow} from "../common/component/Popup/PopupCustom";


export const ButtonGeoCoding = ({currentAddress}) => {

    const dispatch = useDispatch()

    const dataCoordForRoute = useSelector(getCoordinateForRoute);

    const getDistance =  (coordForRoute, currentAddress) => {

        if (coordForRoute && coordForRoute.length === 1) {
            let finalData = {
                coordinates: coordForRoute[0],
                address: currentAddress,
                date: `${new Date().toDateString()}, ${new Date().toLocaleTimeString()}`,
                distance: '0',
                duration: '0',
            };
            dispatch(setCoordinateState(finalData))
            createPopupWindow(finalData.coordinates, finalData.address, finalData.date, finalData.distance, finalData.duration)

        } else if (coordForRoute && coordForRoute.length > 1) {


            let multiRoute =  new window.ymaps.multiRouter.MultiRoute(
                {
                    referencePoints: coordForRoute,
                    params: {result: 1}
                }
            );

            multiRoute.model.events.add('requestsuccess', function () {
                let activeRoute = multiRoute.getActiveRoute();
                let activeRoutePaths = activeRoute.getPaths();

                activeRoutePaths.each( async function (path) {
                    let distance = await path.properties.get("distance").text;
                    let duration = await path.properties.get("duration").text;

                    let finalData = {
                        coordinates: coordForRoute[1],
                        address: currentAddress ,
                        date: `${new Date().toDateString()}, ${new Date().toLocaleTimeString()}`,
                        distance: distance ,
                        duration: duration ,
                    };
                    dispatch(setCoordinateState(finalData))
                    createPopupWindow(finalData.coordinates, finalData.address, finalData.date, finalData.distance, finalData.duration)

                });
                multiRoute.destroy();
            });
        }
    }

    const buttonHandler = () => {
        if (!dataCoordForRoute) {
            alert('Нет данных!')
        } else {
            getDistance(dataCoordForRoute,currentAddress)
        }
    }

    return (

        <button className={style.button_style} onClick={buttonHandler}>
            Отправить
        </button>
    )
}