"use strict";


let count, i;

let highScore = 0;
let currentBtn = 0;
let score;

const ready = ["Ready", "3", "2", "1", "Go"];

function init() {
  score = 0;
  document.querySelector(".score").textContent = score;

  let buttons = [
    document.getElementById('button0'),
    document.getElementById('button1'),
    document.getElementById('button2'),
    document.getElementById('button3')

  ];

  buttons[0].onclick = function () { pressed(0) };
  buttons[1].onclick = function () { pressed(1) };
  buttons[2].onclick = function () { pressed(2) };
  buttons[3].onclick = function () { pressed(3) };
  count = 0;
  i = 0;

  const interv = setInterval(function () {
    document.querySelectorAll(".button").forEach(el => el.disabled = true)
    count += 1;
    document.getElementById("status").innerHTML = ready[count];
    i++;
    if (i >= 4) {
      clearInterval(interv);
      document.querySelectorAll(".button").forEach(el => el.disabled = false)

    }
  }, 1000);


  let timeout = setTimeout(function pickNext(delay) {
    function pickNew(previous) {
      let next;
      do {
        next = Math.trunc(Math.random() * 4);
      } while (previous === next)
      return next;
    }
    let nextBtn = pickNew(currentBtn);
    buttons[currentBtn].style.opacity = .1;
    buttons[nextBtn].style.opacity = 1;
    currentBtn = nextBtn;
    timeout = setTimeout(pickNext, delay, delay);
  }, 5000, 1000);

  const pressed = (i) => {
    if (i !== currentBtn) {
      clearTimeout(timeout);
      if (score > highScore) {
        highScore = score
      }
      document.querySelector(".high-score").textContent = highScore;
      document.getElementById("status").innerHTML = "GAME OVER";
      document.getElementById("reset").style.display = "block";
    } else {
      score++;
      document.querySelector(".score").textContent = score;
    }
  }
}

function start() {
  document.getElementById("reset").style.display = "none";
  document.getElementById("start").style.display = "none";
  document.getElementById("status").style.display = "block";
  init();
}


