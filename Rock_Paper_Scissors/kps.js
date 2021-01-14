'use strict';

let humanCount = 0;
let computerCount = 0;
let draw = 0;
let round = 0;

function computerPlayer() {
  const arr = ["rock.jpg", "scissor.jpg", "paper.jpg"]

  let pick;
  for (let i = 0; i < arr.length; i++) {
    pick = arr[Math.floor(Math.random() * 3)];
  }

  document.getElementById("hidden").style.display = "inline";
  document.querySelector('.display-img-computer').src = pick;
  document.querySelector('.computer-result').style.display = "inline";
  return pick
}

function play() {
  round++;
  computerPlayer();
  result();
}

function pickRock() {
  document.getElementById("hidden").style.display = "none";
  document.querySelector('.computer-result').style.display = "none"
  document.getElementById("human").src = "rock.jpg"
}
function pickScissor() {
  document.querySelector('.computer-result').style.display = "none"
  document.getElementById("hidden").style.display = "none";
  document.getElementById("human").src = "scissor.jpg"
}
function pickPaper() {
  document.querySelector('.computer-result').style.display = "none"
  document.getElementById("hidden").style.display = "none";
  document.getElementById("human").src = "paper.jpg"
}

function displayColor() {
  if (
    document.querySelector('.computer-result').innerHTML === "DRAW") {
    document.querySelector('.computer-result').style.color = "#BC9D00";
  } else if (document.querySelector('.computer-result').innerHTML === "LOST!") {
    document.querySelector('.computer-result').style.color = "#E80189";
  } else {
    document.querySelector('.computer-result').style.color = "#01A54D";
  }
}

function result() {
  let computerChoice = computerPlayer();
  let humanChoice = document.getElementById("human").src.substring(62);

  if (computerChoice === humanChoice) {

    draw++;
    document.getElementById('tie').innerHTML = draw;
    document.querySelector('.computer-result').innerHTML = "A DRAW";
  } else if ((computerChoice === 'rock.jpg') && (humanChoice === 'scissor.jpg')) {

    computerCount++;
    document.getElementById('computerWin').innerHTML = computerCount;
    document.querySelector('.computer-result').innerHTML = "YOU LOST!";
  } else if ((computerChoice === 'rock.jpg') && (humanChoice === 'paper.jpg')) {

    humanCount++;
    document.getElementById('humanWin').innerHTML = humanCount;
    document.querySelector('.computer-result').innerHTML = "YOU WIN!";
  } else if ((computerChoice === 'paper.jpg') && (humanChoice === 'scissor.jpg')) {
    humanCount++;
    document.getElementById('humanWin').innerHTML = humanCount;
    document.querySelector('.computer-result').innerHTML = "YOU WIN!";
  } else if ((computerChoice === 'paper.jpg') && (humanChoice === 'rock.jpg')) {

    computerCount++;
    document.getElementById('computerWin').innerHTML = computerCount;
    document.querySelector('.computer-result').innerHTML = "YOU LOST!";
  } else if ((computerChoice === 'scissor.jpg') && (humanChoice === 'rock.jpg')) {

    humanCount++;
    document.getElementById('humanWin').innerHTML = humanCount;
    document.querySelector('.computer-result').innerHTML = "YOU WIN!";
  } else if ((computerChoice === 'scissor.jpg') && (humanChoice === 'paper.jpg')) {

    computerCount++;
    document.getElementById('computerWin').innerHTML = computerCount;
    document.querySelector('.computer-result').innerHTML = "YOU LOST!";
  }
  displayColor();


}

function playAgain() {
  document.location.href = "";
}
