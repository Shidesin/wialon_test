import React from "react";
import style from './ButtonGeoCoding.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getCoordinateForRoute} from "../selectors/appSelector";
import {setCoordinateState} from "../redux/coordinateDataState-reducer";


export const ButtonGeoCoding = React.memo(({currentAddress}) => {
    console.log('Render ButtonGeoCoding')

    const dispatch = useDispatch()

    const dataCoordForRoute = useSelector(getCoordinateForRoute);

    const getDistance =  (coordForRoute, currentAddress) => {

        if (coordForRoute && coordForRoute.length === 1) {
            let finalData = {
                coordinates: coordForRoute,
                address: currentAddress,
                date: `${new Date()}`,
                distance: '',
                duration: '',
            };
            dispatch(setCoordinateState(finalData))

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
                        coordinates: coordForRoute,
                        address: currentAddress ,
                        date: `${new Date()}`,
                        distance: distance ,
                        duration: duration ,
                    };
                    dispatch(setCoordinateState(finalData))

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
})