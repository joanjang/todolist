const body = document.querySelector("body");

const IMG_NUM = 4;

function viewImage(imgNum) {
    const img = new Image();

    img.src = `../img/${imgNum + 1}.jpg`;
    img.classList.add("backgoundImage");
    body.prepend(img);
}

function getRandom() {
    return Math.floor(Math.random() * IMG_NUM);
}

function init() {
    const randomNum = getRandom();
    viewImage(randomNum);
}

init();
