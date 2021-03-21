const weather = document.querySelector(".js-weather"),
    contents = weather.querySelectorAll("span");

const API_KEY = "7ef6c8bded9d146e91177768feb660f0";
const COORDS_LS = "coords";

function paintImg(iconId) {
    const div = document.createElement("div");
    const icon = new Image();
    icon.src = `http://openweathermap.org/img/wn/${iconId}.png`;
    
    div.appendChild(icon);

    return div;
}

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
        ).then(function (res) {
            return res.json();
        }).then(function (json) {
            const crrPlace = json.name;
            const minTemp = json.main.temp_min
            const maxTemp = json.main.temp_max;
            const crrWeather = json.weather[0].icon;

            contents[0].innerText = crrPlace;
            contents[1].before(paintImg(crrWeather));
            contents[1].innerText = `${minTemp} / ${maxTemp}°C`;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handelGeoSucces(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const coordsObj = {
        lat,
        lon
    };

    saveCoords(coordsObj);
    getWeather(lat, lon);
}

function handelGeoError(pos) {

}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handelGeoSucces, handelGeoError);
}

function loadCoords() {
    const crrCooreds = localStorage.getItem(COORDS_LS);

    if( crrCooreds !== null ) {
        const parsedCoords = JSON.parse(crrCooreds);
        getWeather(parsedCoords.lat, parsedCoords.lon);
    } else {
        askForCoords();
    }
 }

loadCoords();