"use strict";

let number = Math.floor(Math.random() * 50) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message
}

function checkNumber() {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) { displayMessage(String.fromCodePoint(0x1f198) + " No number!") }
  else if (guess <= 0 || guess > 50) {
    displayMessage(String.fromCodePoint(0x1f6ab) + " Invalid number!")
  }

  else if (guess === number) {
    displayMessage(String.fromCodePoint(0x1f38a) + " Correct number!")
    document.querySelector(".number").textContent = number;
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else if (guess !== number) {
    if (score > 1) {
      displayMessage(guess > number ? String.fromCodePoint(0x1f614) + " Too high!" : String.fromCodePoint(0x1f614) + " Too low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage(String.fromCodePoint(0x1f4a5) + " GAME OVER!")
      document.querySelector(".score").textContent = 0;
    }
  }
}
document.querySelector(".check").addEventListener("click", checkNumber);

document.querySelector(".again").addEventListener("click", function () {
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  score = 20;
  number = Math.floor(Math.random() * 50) + 1;
  displayMessage("Start guessing...")
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = ""
}
)

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    checkNumber();
  }
})