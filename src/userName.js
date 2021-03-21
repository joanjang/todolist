const nameForm = document.querySelector(".js-inputName"),
      userName = nameForm.querySelector("input"),
      greeting = document.querySelector(".js-greeting");

const USERNAME_LS = "userName",
      SHOWING_CN = "showing";

function setUserName(name) {
    localStorage.setItem(USERNAME_LS, name);
}

function handleSubmitName(e) {
    e.preventDefault();
    
    const crrUserName = userName.value;

    viewGreeting(crrUserName);
    setUserName(crrUserName);
}

function askForName() {
    nameForm.classList.add(SHOWING_CN);
    nameForm.addEventListener("submit",handleSubmitName);
}

function viewGreeting(name) {
    nameForm.classList.remove(SHOWING_CN);
    
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `${name} 님, 환영합니다`;
}

function loadName() {
    const crrUserName = localStorage.getItem(USERNAME_LS);

    if( crrUserName !== null ) {
        viewGreeting(crrUserName);
    } else {
        askForName();
    }
 }

loadName();