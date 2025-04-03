let userSq = [];
let gameSq = [];

let btns = ["red", "orange", "green", "teal"];

let started = false;
let level = 0;
let highestScore = 0;

let lvShow = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(function () {
        btn.classList.remove("gameFlash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSq = [];
    level++;
    lvShow.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameFlash(randBtn);

    gameSq.push(randColor);
}

function checkAns(idx) {
    if (userSq[idx] == gameSq[idx]) {
        if (userSq.length == gameSq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        let currScore = level - 1;
        if(highestScore < currScore){
            highestScore = currScore;
            let h3 = document.querySelector("h3");
            h3.innerText = `Highest Score ${highestScore}`; 
            h3.classList.remove("hide");
        }
        lvShow.innerHTML = `Game Over! Your score was <b>${level}</b> </br> Press any key to start.`;
        document.querySelector("body").style.backgroundImage = "none";
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundImage = "url(img.jpg)";
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSq.push(userColor);
    checkAns(userSq.length - 1);
}

let allBtns = document.querySelectorAll(".box");

for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    level = 0;
    userSq = [];
    gameSq = [];
}