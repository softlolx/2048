const startButton = document.querySelector(".start-button");
const rulesBlock = document.querySelector(".rules");
const boardBlock = document.querySelector(".board");
const gamefield = document.querySelector(".gamefield");
const actualScore = document.querySelector("#actual-score");

function openGame() {
  rulesBlock.classList.add("rules_hidden");
  boardBlock.classList.remove("board_hidden");
}

let actScore = 0;

let board = [
  [0, 0, 0, 2],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function clearBoard() {
  gamefield.innerHTML = "";
}

function addScore(score) {
  actScore += score;

  actualScore.innerHTML = actScore;
}

function generateRandomCell() {
  let row = Math.floor(Math.random() * 4);
  let col = Math.floor(Math.random() * 4);
  let num = Math.floor(Math.random() * 2 + 1) * 2;
  if (board[row][col] == 0) {
    board[row][col] = num;
  }
}

function generateBoard() {
  clearBoard();
  generateRandomCell();

  board.forEach((row, rowNum) => {
    row.forEach((column, colNum) => {
      let cell = document.createElement("div");
      cell.classList.add("cell", "cell__number");
      cell.id = `${rowNum}${colNum}`;
      cell.classList.add(`cell__number_${column}`);
      cell.textContent = column;
      gamefield.append(cell);
    });
  });
}

function removeZeroes(row) {
  let noZeroesRow = row.filter((cell) => cell !== 0);
  return noZeroesRow;
}

function swipe(row) {
  noZeroesRow = removeZeroes(row);

  for (let i = 0; i < noZeroesRow.length - 1; i++) {
    if (noZeroesRow[i] == noZeroesRow[i + 1]) {
      noZeroesRow[i] *= 2;
      noZeroesRow[i + 1] = 0;
      addScore(+noZeroesRow[i]);
    }
  }

  noZeroesRow = removeZeroes(noZeroesRow);

  for (let i = noZeroesRow.length; i < 4; i++) {
    noZeroesRow.push(0);
  }

  return noZeroesRow;
}

function moveCellsLeft() {
  board.forEach((row, rowNum) => {
    let newRow = swipe(row);
    board[rowNum] = newRow;
  });

  generateBoard();
}

function moveCellsRight() {
  board.forEach((row, rowNum) => {
    row.reverse();
    let newRow = swipe(row);
    newRow.reverse();
    board[rowNum] = newRow;
  });

  generateBoard();
}

function moveCellsUp() {
  board.forEach((row, rowNum) => {
    let horizontalRow = [
      board[0][rowNum],
      board[1][rowNum],
      board[2][rowNum],
      board[3][rowNum],
    ];

    let newRow = swipe(horizontalRow);

    board[0][rowNum] = newRow[0];
    board[1][rowNum] = newRow[1];
    board[2][rowNum] = newRow[2];
    board[3][rowNum] = newRow[3];
  });

  generateBoard();
}

function moveCellsDown() {
  board.forEach((row, rowNum) => {
    let horizontalRow = [
      board[0][rowNum],
      board[1][rowNum],
      board[2][rowNum],
      board[3][rowNum],
    ];

    horizontalRow.reverse();

    let newRow = swipe(horizontalRow);

    newRow.reverse();

    board[0][rowNum] = newRow[0];
    board[1][rowNum] = newRow[1];
    board[2][rowNum] = newRow[2];
    board[3][rowNum] = newRow[3];
  });

  generateBoard();
}

startButton.addEventListener("click", () => {
  openGame();
  generateBoard();
});

document.addEventListener("keyup", (evt) => {
  if (evt.key == "ArrowLeft") {
    moveCellsLeft();
  } else if (evt.key == "ArrowRight") {
    moveCellsRight();
  } else if (evt.key == "ArrowUp") {
    moveCellsUp();
  } else if (evt.key == "ArrowDown") {
    moveCellsDown();
  }
});
