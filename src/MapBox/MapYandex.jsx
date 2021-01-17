import React, {useEffect, useRef, useState} from 'react'
import {Map, Placemark, RouteEditor, YMaps} from "react-yandex-maps";

export const MapYandex = () => {
    console.log('Render YMap')

    const [coordinates, setCoordinates] = useState([])

    let maps = useRef(null)
    let [yMaps, setYMaps] = useState(null);
    let newMarker = null

    console.log(coordinates)
    const query = {
        lang: 'ru_RU',
        load: 'package.full',
        apikey: process.env.REACT_APP_YANDEX_API_KEY
    };

    const mapData = {
        center: [53.9, 27.56],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: [
            "drag",
            "scrollZoom",
        ]
    };

    const style = {
        width: "100%",
        height: "100vh"
    };

    const initMap = (ymap, mapRef) => {

        if (ymap) yMaps = setYMaps(ymap);
        if (mapRef) maps = mapRef
        if (!yMaps || !maps) return;


        //marker
        maps.events.add('dblclick', function (e) {
            let coords = e.get('coords');
            console.log(coords)

            // setCoordinates([...coordinates, coords])

            // Если метка уже создана – просто передвигаем ее.
            if (newMarker) {
                newMarker.geometry.setCoordinates(coords);
            }
            // Если нет – создаем.
            else {
                newMarker = createPlacemark(coords);
                maps.geoObjects.add(newMarker);

                // Слушаем событие окончания перетаскивания на метке.

                // newMarker.events.add('dragend', function () {
                //     getAddress(newMarker.geometry.getCoordinates());
                // });

            }
            getAddress(coords);
        });

        // Создание метки.
        function createPlacemark(coords) {
            return new yMaps.Placemark(coords, {
                iconCaption: ''
            }, {
                preset: 'islands#violetDotIconWithCaption',
                draggable: false
            });
        }

        function getAddress(coords) {

            newMarker.properties.set('iconCaption', 'Загрузка...');
            yMaps.geocode(coords).then(function (res) {
                let firstGeoObject = res.geoObjects.get(0);

                newMarker.properties
                    .set({
                        // Формируем строку с данными об объекте.
                        iconCaption: [
                            // Название населенного пункта или вышестоящее административно-территориальное образование.
                            firstGeoObject.getLocalities().length
                                ? firstGeoObject.getLocalities()
                                : firstGeoObject.getAdministrativeAreas(),
                            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()

                        ].filter(Boolean).join(', '),
                        // В качестве контента балуна задаем строку с адресом объекта.
                        balloonContent: firstGeoObject.getAddressLine(),

                    });
            });

        }

        //marker

        //multiRoute
        let multiRoute = new yMaps.multiRouter.MultiRoute({
            referencePoints: coordinates
        });

        multiRoute.model.events.add('requestsuccess', function () {

            let activeRoute = multiRoute.getActiveRoute();

            let activeRoutePaths = activeRoute.getPaths();

            activeRoutePaths.each(function (path) {

                console.log("Длина пути: " + path.properties.get("distance").text);
                console.log("Время прохождения пути: " + path.properties.get("duration").text);
            });
        });
        multiRoute.editor.stop();
        maps.geoObjects.add(multiRoute);
        //multiRoute

    }


    return (
        <YMaps query={query}>
            <div
                // onDoubleClick={addMarker}
            >
                <Map
                    style={style}
                    defaultState={mapData}
                    instanceRef={(ref) => initMap(null, ref)}
                    onLoad={(ymap) => initMap(ymap, null)}
                >

                    {coordinates.map((coordinate, idx) => <Placemark geometry={coordinate} key={idx}/>)}


                </Map>
            </div>
        </YMaps>
    )
}