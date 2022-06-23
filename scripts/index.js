const startButton = document.querySelector(".start-button");
const rulesBlock = document.querySelector(".rules");
const boardBlock = document.querySelector(".board");
const gamefield = document.querySelector(".gamefield");

function openGame() {
  rulesBlock.classList.add("rules_hidden");
  boardBlock.classList.remove("board_hidden");
}

let board = [
  [2, 2, 2, 2],
  [16, 4, 4, 8],
  [0, 2, 2, 0],
  [0, 0, 0, 0],
];

function clearBoard() {
  gamefield.innerHTML = "";
}

function generateBoard() {
  clearBoard();
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

startButton.addEventListener("click", () => {
  openGame();
  generateBoard();
});

document.addEventListener("keyup", (evt) => {
  if (evt.key == "ArrowLeft") {
    moveCellsLeft();
  } else if (evt.key == "ArrowRight") {
    moveCellsRight();
  }
});
//temp

openGame();
generateBoard();
