const clockDiv = document.querySelector(".js-clock"),
    date = clockDiv.querySelector("H5"),
    time = clockDiv.querySelector("H1");

function getDay(days) {
    switch (days) {
        case 1:
            return "월";
            break;

        case 2:
            return "화";
            break;

        case 3:
            return "수";
            break;

        case 4:
            return "목";
            break;

        case 5:
            return "금";
            break;

        case 6:
            return "토";
            break;

        case 0:
            return "일";
            break;
    }
}

function getDateTime() {
    const crrDate = new Date();

    const years = crrDate.getFullYear();
    const months = crrDate.getMonth();
    const dates = crrDate.getDate();
    const days = crrDate.getDay();

    const hours = crrDate.getHours();
    const minutes = crrDate.getMinutes();
    const seconds = crrDate.getSeconds();

    date.innerHTML = `${years}년 
                      ${months}월 
                      ${dates}일 
                      ${getDay(days)}요일`;

    time.innerHTML = `${hours < 10 ? `0${hours}` : hours} :
                    ${minutes < 10 ? `0${minutes}` : minutes} :
                    ${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
    getDateTime();
    setInterval(getDateTime, 1000);
}

init();