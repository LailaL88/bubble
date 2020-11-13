const circleStart = document.querySelector(".circleStart");
const circle = document.querySelector(".circle");
const computerScore = document.querySelector(".computerScore");
const playerScoreSpan = document.querySelector(".playerScore");
const gameRules = document.querySelector(".gameRules");
const game = document.querySelector(".gameField");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.querySelector(".restartBtn");
const winText = document.querySelector(".winText");
const x = window.matchMedia("(min-width: 700px)");
let turn = 1;
let score = 0;
let buttonClicked = 0;
let playerScore = 0;
let myInterval = "";
let circleClicked = 0;
let storage = "";


function onGameStart() {
    if (buttonClicked == 0) {
        gameRules.style.display = "none";
        computerScore.innerText = 0;
        circleStart.style.display = "none";
        circle.style.display = "block";
        getRandomPlace(circle);
        myInterval = setInterval(function() { getRandomPlace(circle) }, 1650);
    }
    buttonClicked = 1;
    startBtn.style.display = "none";
    restartBtn.style.display = "inline";
    restartBtn.style.backgroundColor = "yellowgreen";
    restartBtn.onclick = function() {
        if (game.innerText == "you win") {
            game.innerHTML = "";
            let newCircle = document.createElement("div");
            newCircle.className = "circle";
            newCircle.style.display = "block";
            game.appendChild(newCircle);
            getRandomPlace(newCircle);
            myInterval = setInterval(function() { getRandomPlace(newCircle) }, 1650);
            newCircle.onclick = function() { clickCircle() };
        }
        resetPlayerScore();
        computerScore.innerText = 0;
        score = 0;
        return score;
    }
}

function resetPlayerScore() {
    playerScoreSpan.innerText = 0;
    playerScore = 0;
    return playerScore;
}

function getComputerScore() {
    turn++;
    if (turn % 2 > 0) {
        score++;
        computerScore.innerText = score;
    }
}

function getRandomPlace(circle) {
    circleClicked = 0;
    let randomPercent = Math.floor(Math.random() * 63);
    if (x.matches) {
        randomPercent = Math.floor(Math.random() * 90);
    }
    let randomHeight = Math.floor(Math.random() * 70);
    circle.style.left = randomPercent + "%";
    circle.style.marginTop = randomHeight + "vh";
    getComputerScore();
    getRandomColor(circle);
    getRandomSize(circle);
}

function clickCircle() {
    if (circleClicked == 0) {
        playerScore++;
        playerScoreSpan.innerText = playerScore;
        if (playerScore - score > 9) {
            clearInterval(myInterval);
            game.innerHTML = "<div class = 'winText'>you win</div>";
        }
    }
    circleClicked = 1;
}
circle.onclick = function() { clickCircle() };

function getRandomColor(circle) {
    let a = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let c = Math.floor(Math.random() * 255);
    let color = "rgb(" + a + "," + b + "," + c + ")";
    circle.style.backgroundColor = color;
}

function getRandomSize(circle) {
    let randomSize = Math.floor(Math.random() * 50 + 60);
    console.log(randomSize);
    circle.style.height = randomSize + "px";
    circle.style.width = randomSize + "px";
}
