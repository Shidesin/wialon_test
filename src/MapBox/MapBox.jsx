import React, {useEffect, useRef} from "react";
import {loadScriptApi} from "../utils/yandexMapUtils";
import {useDispatch} from "react-redux";
import {setCurrentGeoCoord, setDataToArrayGeoData} from '../redux/current-coordinate-reducer'


export  const MapBox = () => {

    const maps = useRef()

    const dispatch = useDispatch()

    const style = {
        width: "100%",
        height: "90vh"
    };

    useEffect(() => {
        loadScriptApi(() => {
            window.ymaps.ready(init);
        });
    }, []);

    const init = () => {

        let myMap;
        if (maps.current) {

            myMap = new window.ymaps.Map(maps.current, {
                center: [53.9, 27.56],
                zoom: 12,
                controls: ['zoomControl'],
                behaviors: [
                    "drag",
                    "scrollZoom",
                ]
            })

            myMap.events.add('dblclick', function (e) {
                let coords = e.get('coords').toString().split(',');
                dispatch(setCurrentGeoCoord(coords))
                dispatch(setDataToArrayGeoData(coords))
            });
        }
    };

    return (
        <div className="App">
            <div ref={maps} style={style}/>
        </div>
    );
}