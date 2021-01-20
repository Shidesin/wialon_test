export const loadScriptApi = (onLoad) => {
    const mapUrl = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.REACT_APP_YANDEX_API_KEY}&lang=ru_RU`

    const script = document.createElement("script");
    script.src = mapUrl;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = onLoad;
};

export const getDistance = (dataRoute) => {
    let multiRoute = new window.ymaps.multiRouter.MultiRoute(
        {
            referencePoints: dataRoute,
            params: {result: 1}
        },
        {boundsAutoApply: true}
    );

    multiRoute.model.events.add('requestsuccess', function () {
        debugger

        let activeRoute = multiRoute.getActiveRoute();

        let activeRoutePaths = activeRoute.getPaths();

        activeRoutePaths.each(function (path) {

            console.log("Длина пути: " + path.properties.get("distance").text);
            console.log("Время прохождения пути: " + path.properties.get("duration").text);
        });

        // multiRoute.destroy();
    });
    multiRoute.editor.stop();
    // maps.geoObjects.add(multiRoute);
}
