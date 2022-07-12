const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".board__btn_reset");
const infoButton = document.querySelector(".board__btn_info");
const rulesBlock = document.querySelector(".rules");
const boardBlock = document.querySelector(".board");
const gameField = document.querySelector(".gamefield");
const header = document.querySelector(".header");
const scoreContainer = document.querySelector(".board__text-score");
const scoreText = document.querySelector(".board__text-info");
const headerScoreText = document.querySelector(".header__best-score");
let board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
let numbers = [];
let initialScore = 0;
let touchstartX = 0;
let touchendX = 0;
let touchstartY = 0;
let touchendY = 0;

const checkWin = () => {
  const arr = [...board[0], ...board[1], ...board[2], ...board[3]];
  if (!arr.includes(0)) {
    let lastScore = initialScore;
    resetGame();
    updateBoard();
    gameField.classList.add("board_hidden");
    scoreText.textContent = "Final score";
    scoreContainer.textContent = lastScore;
    if (headerScoreText.textContent < lastScore) {
      headerScoreText.textContent = lastScore;
    }
  }
};

const touchHandle = () => {
  if (touchendX < touchstartX) {
    moveLeft();
    appendRandom();
    updateBoard();
  }

  if (touchendX > touchstartX) {
    moveRight();
    appendRandom();
    updateBoard();
  }

  if (touchendY < touchstartY) {
    moveUp();
    appendRandom();
    updateBoard();
  }

  if (touchendY > touchstartY) {
    moveDown();
    appendRandom();
    updateBoard();
  }
};

const closeGame = () => {
  rulesBlock.classList.remove("rules_hidden");
  boardBlock.classList.add("board_hidden");
  header.classList.remove("header_active");
  scoreText.textContent = "Score";
  resetGame();
};

const openGame = () => {
  rulesBlock.classList.add("rules_hidden");
  boardBlock.classList.remove("board_hidden");
  header.classList.add("header_active");
  gameField.classList.remove("board_hidden");
  generateBoard();
  if (
    document.querySelector(".cell__number_2") == null ||
    document.querySelector(".cell__number_4") == null
  ) {
    setTimeout(() => {
      appendRandom();
      appendRandom();
      updateBoard();
    }, 500);
  }
};

const resetGame = () => {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  initialScore = 0;
  addScore(0);
};

const addScore = (score) => {
  initialScore += score;
  scoreContainer.textContent = initialScore;
};

const generateBoard = () => {
  if (gameField.children.length == 0) {
    for (let i = 0; i < 16; i++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      let number = document.createElement("div");
      number.classList.add(`cell__number`);
      number.textContent = "";
      cell.appendChild(number);
      gameField.append(cell);
    }
    let arr = Array.from(gameField.querySelectorAll(".cell__number"));
    while (arr.length > 0) {
      numbers.push(arr.splice(0, 4));
    }
  }
};

const updateBoard = () => {
  for (let i = 0; i < board.length; i++) {
    for (let k = 0; k < board[i].length; k++) {
      numbers[k][i].classList.remove(`cell__number_${board[k][i]}`);
      numbers[k][i].textContent = board[k][i];
      if (numbers[k][i].textContent == 0) {
        numbers[k][i].textContent = "";
        numbers[k][i].className = "cell__number";
      } else {
        numbers[k][i].className = "cell__number";
        numbers[k][i].classList.add(`cell__number_${board[k][i]}`);
        // getting position for animations...
        // numbers[k][i].classList.add(`cell__number_position_${board.indexOf(board[k])}_${board.indexOf(board[i])}`)
      }
    }
  }
};

const fillZero = (el, method) => {
  while (el.length < 4) {
    el[method](0);
  }
};

const filterEmpty = (el) => {
  return el.filter((item) => item);
};

const updateParams = (el) => {
  if (el.length > 0) {
    for (let i = 0; i < el.length; i++) {
      if (el[i] === el[i + 1]) {
        el[i] *= 2;
        el[i + 1] = 0;
        addScore(el[i]);
      }
    }
  }
};

const moveDown = () => {
  let row = [];
  let finalRow = [];
  let newBoard = [];

  for (let i = 0; i < board.length; i++) {
    for (let k = 0; k < board[i].length; k++) {
      row.push(board[k][i]);
    }
  }

  while (row.length > 0) {
    finalRow.push(row.splice(0, 4));
  }

  finalRow = finalRow.map((el) => {
    el = filterEmpty(el);
    el.reverse();
    updateParams(el);
    el = filterEmpty(el);
    fillZero(el, "push");
    el.reverse();
    return el;
  });
  for (let i = 0; i < finalRow.length; i++) {
    for (let k = 0; k < finalRow[i].length; k++) {
      row.push(finalRow[k][i]);
    }
  }
  while (row.length > 0) {
    newBoard.push(row.splice(0, 4));
  }
  board = newBoard;
};

const moveLeft = () => {
  board = board.map((el) => {
    el = filterEmpty(el);
    updateParams(el);
    el = filterEmpty(el);
    fillZero(el, "push");

    return el;
  });
};

const moveUp = () => {
  let row = [];
  let finalRow = [];
  let newBoard = [];

  for (let i = 0; i < board.length; i++) {
    for (let k = 0; k < board[i].length; k++) {
      row.push(board[k][i]);
    }
  }

  while (row.length > 0) {
    finalRow.push(row.splice(0, 4));
  }

  finalRow = finalRow.map((el) => {
    el = filterEmpty(el);
    updateParams(el);
    el = filterEmpty(el);
    fillZero(el, "push");
    return el;
  });
  for (let i = 0; i < finalRow.length; i++) {
    for (let k = 0; k < finalRow[i].length; k++) {
      row.push(finalRow[k][i]);
    }
  }
  while (row.length > 0) {
    newBoard.push(row.splice(0, 4));
  }
  board = newBoard;
};

const moveRight = () => {
  board = board.map((el) => {
    el = filterEmpty(el);
    el.reverse();
    updateParams(el);
    el = filterEmpty(el);
    fillZero(el, "push");
    el.reverse();
    return el;
  });
};

const appendRandom = () => {
  let arr, el;

  const randomArr = () => {
    if (Error) {
      checkWin();
    }
    arr = Math.floor(Math.random() * 4);
    return arr;
  };

  const randomEl = () => {
    el = Math.floor(Math.random() * 4);
    return el;
  };

  const randomNum = () => {
    el = Math.random() < 0.5 ? 2 : 4;
    return el;
  };

  randomArr();
  randomEl();

  numbers[arr][el].classList.add("cell__number_new");
  if (board[arr][el] == 0) {
    board[arr][el] = randomNum();
  } else {
    appendRandom();
  }
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    moveUp();
    appendRandom();
    updateBoard();
  }
  if (e.key === "ArrowDown") {
    e.preventDefault();
    moveDown();
    appendRandom();
    updateBoard();
  }
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    moveLeft();
    appendRandom();
    updateBoard();
  }
  if (e.key === "ArrowRight") {
    e.preventDefault();
    moveRight();
    appendRandom();
    updateBoard();
  }
});

startButton.addEventListener("click", openGame);
resetButton.addEventListener("click", () => {
  resetGame();
  scoreText.textContent = "Score";
  gameField.classList.remove("board_hidden");
  appendRandom();
  appendRandom();
  updateBoard();
});
infoButton.addEventListener("click", () => {
  closeGame();
  updateBoard();
});

document.addEventListener(
  "touchstart",
  (e) => {
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
  },
  { passive: true }
);
document.addEventListener(
  "touchend",
  (e) => {
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    touchHandle();
  },
  { passive: true }
);
