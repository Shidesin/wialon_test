export const loadScriptApi = (onLoad) => {
    const mapUrl = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.REACT_APP_YANDEX_API_KEY}&lang=ru_RU`

    const script = document.createElement("script");
    script.src = mapUrl;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = onLoad;
};
