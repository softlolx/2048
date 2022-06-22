const startButton = document.querySelector(".start-button");
const rulesBlock = document.querySelector(".rules");
const boardBlock = document.querySelector(".board");

function openGame() {
  rulesBlock.classList.add("rules_hidden");
  boardBlock.classList.remove("board_hidden");
}

const gamefield = document.querySelector(".gamefield");

// [0, 0, 0, 0],
// [0, 0, 0, 0],
// [0, 0, 0, 0],
// [0, 0, 0, 0],

let board = [
  [2, 2, 0, 0],
  [4, 4, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function generateBoard(newoard) {
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

function moveCellsLeft() {
  //remove zeroes from each row
  board.forEach((row, rowNum) => {
    let newRow = row.filter((cell) => cell !== 0);
    board[rowNum] = newRow;
  });

  //THERE must be a function that checks for similar cells and doubles it if so, changing the second cell to zero

  // function that removes zeroes again (that must be a global func)

  //get zeroes back

  board.forEach((row, rowNum) => {
    for (let i = row.length; i < 4; i++) {
      row.push(0);
    }
  });

  console.log(board);
}

startButton.addEventListener("click", () => {
  openGame();
  generateBoard();
});

document.addEventListener("keyup", (evt) => {
  if (evt.key == "ArrowLeft") {
    moveCellsLeft();
  }
});
//temp

openGame();
generateBoard();
