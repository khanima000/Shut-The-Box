const p1 = document.querySelector("#user1-input");
const p2 = document.querySelector("#user2-input");
const firstDice = document.querySelector("#first-dice");
const secondDice = document.querySelector("#second-dice");
const rollBtn = document.querySelector("#roll-btn");
const indivBtn = document.querySelector("#indiv-btn");
const sumBtn = document.querySelector("#sum-btn");
const endBtn = document.querySelector("#end-btn");
const startBtn = document.querySelector("#start-btn");
const scoreCard = document.querySelector("#scorecard");
const mainGrid = document.querySelector(".main-grid");
const scoreTableBody = document.querySelector("#score-table-body");
const winnerSection = document.querySelector("#winner-section");
const winnerMessage = document.querySelector("#winner-message");
const playAgainBtn = document.querySelector("#play-again-btn");

const boxes = Array(10).fill(0);

let round = 1;
let userTurn = "";
let die1 = 1;
let die2 = 1;
let totalPoints1 = 0;
let totalPoints2 = 0;
function updateScore() {
  scoreCard.style.display = "block";
}

// Start button functionality
startBtn.addEventListener("click", () => {
  if (p1.value.trim() === "") {
    alert("Please enter Player 1 name");
    p1.focus();
  } else if (p2.value.trim() === "") {
    alert("Please enter Player 2 name");
    p2.focus();
  } else {
    userTurn = p1.value.trim();
    mainGrid.style.display = "block";
    scoreCard.style.display = "block";
    winnerSection.style.display = "none";
    startBtn.disabled = true;
    p1.disabled = true;
    p2.disabled = true;
    rollBtn.disabled = false;
    alert(`${userTurn}'s turn!`);
    updateScore();
  }
});

// Roll button functionality
rollBtn.addEventListener("click", () => {
  die1 = Math.floor(Math.random() * 6) + 1;
  die2 = Math.floor(Math.random() * 6) + 1;
  firstDice.className = `bi bi-dice-${die1}`;
  secondDice.className = `bi bi-dice-${die2}`;
  indivBtn.disabled = boxes[die1] === "X" || boxes[die2] === "X";
  sumBtn.disabled = die1 + die2 > 9 || boxes[die1 + die2] === "X";
  endBtn.disabled = !(indivBtn.disabled && sumBtn.disabled);
  rollBtn.disabled = true;
});

// Individual button functionality
indivBtn.addEventListener("click", () => {
  const diceNumbers = [die1, die2];
  diceNumbers.forEach((num) => {
    boxes[num] = "X";
  });
  boxes[0] += die1 + die2;
  rollBtn.disabled = false;
  indivBtn.disabled = true;
  sumBtn.disabled = true;
});
// Sum button functionality
sumBtn.addEventListener("click", () => {
  const sum = die1 + die2;
  boxes[sum] = "X";
  boxes[0] += sum;

  rollBtn.disabled = false;
  indivBtn.disabled = true;
  sumBtn.disabled = true;
});

// End Turn button functionality
endBtn.addEventListener("click", () => {
  const currentPoints = 45 - boxes[0];

  if (userTurn === p1.value.trim()) {
    totalPoints1 += currentPoints;

    const row = document.createElement("tr");
    row.innerHTML = `<th>Round ${round}</th><td>${currentPoints}</td><td></td>`;
    scoreTableBody.appendChild(row);

    userTurn = p2.value.trim();
  } else {
    totalPoints2 += currentPoints;

    const row = document.querySelector(`#score-table-body tr:last-child td:last-child`);
    row.textContent = currentPoints;

    userTurn = p1.value.trim();
    round++;
  }

  if (round > 5) {
    gameOver();
  } else {
    resetBoard();
  }
});
const numberBoxes = document.querySelectorAll('.number-box');
indivBtn.addEventListener('click', function () {
  const diceNumbers = [die1, die2];
  diceNumbers.forEach((num) => {
    const box = document.querySelector(`#box${num}`);
    if (box && !box.classList.contains('shut')) {
      box.classList.add('shut');
      boxes[num - 1] = 'X';
    }
  });
  updateScore();
  rollBtn.disabled = false;
  indivBtn.disabled = true;
  sumBtn.disabled = true;
});
sumBtn.addEventListener('click', function () {
  const sum = die1 + die2;
  const box = document.querySelector(`#box${sum}`);
  if (box && !box.classList.contains('shut')) {
    box.classList.add('shut');
    boxes[sum - 1] = 'X';
  }
  updateScore();
  rollBtn.disabled = false;
  indivBtn.disabled = true;
  sumBtn.disabled = true;
});
function resetBoard() {
  boxes.fill(0);
  document.querySelectorAll(".shut").forEach((el) => {
    el.classList.remove("shut");
    el.textContent = el.id.replace("box", "");
  });
  rollBtn.disabled = false;
  endBtn.disabled = true;
}
function gameOver() {
  mainGrid.style.display = "none";
  scoreCard.style.display = "block";
  winnerSection.style.display = "block";
  if (totalPoints1 < totalPoints2) {
    winnerMessage.textContent = `${p1.value.trim()} wins with ${totalPoints1} points!`;
  } else {
    winnerMessage.textContent = `${p2.value.trim()} wins with ${totalPoints2} points!`;
  }
}
playAgainBtn.addEventListener("click", () => {
  location.reload();
});
