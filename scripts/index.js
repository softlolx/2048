const startButton = document.querySelector(".start-button");
const rulesBlock = document.querySelector(".rules");
const boardBlock = document.querySelector('.board');
const gameField = document.querySelector('.gamefield');
const header = document.querySelector('.header')

const openGame = () => {
  rulesBlock.classList.add('rules_hidden');
  boardBlock.classList.remove('board_hidden');
  header.classList.add('header_active')
  generateBoard()
  setTimeout(() => {
    appendRandom()
    appendRandom()
    updateBoard()
  }, 500)
}

startButton.addEventListener("click", openGame);

let board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]

let numbers = []

const generateBoard = () => {
  for (let i = 0; i < 16; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    let number = document.createElement('div');
    number.classList.add(`cell__number`);
    number.textContent = '';
    cell.appendChild(number)
    gameField.append(cell)
  }
  let arr = Array.from(gameField.querySelectorAll('.cell__number'));
  while (arr.length > 0) {
    numbers.push(arr.splice(0, 4))
  }
  console.log(numbers[0])
}


const updateBoard = () => {
  for (let i = 0; i < board.length; i++) {
    for (let k = 0; k < board[i].length; k++) {
      numbers[k][i].classList.remove(`cell__number_${board[k][i]}`)
      numbers[k][i].textContent = board[k][i]
      if (numbers[k][i].textContent == 0) {
        numbers[k][i].textContent = '';
        numbers[k][i].className = 'cell__number'
      } else {
        numbers[k][i].className = 'cell__number'
        numbers[k][i].classList.add(`cell__number_${board[k][i]}`)
        // getting position for animations...
        /* numbers[k][i].classList.add(`cell__number_position_${board.indexOf(board[k])}_${board.indexOf(board[i])}`) */
      }     
    }
  }
}


const fillZero = (el, method) => {
  while (el.length < 4) {
    el[method](0)
  }
}

const filterEmpty = (el) => {
  return el.filter(item => item);
}

const updateParams = (el) => {
  if (el.length > 0) {
    for (let i = 0; i < el.length; i++) {
      if (el[i] === el[i + 1]) {
        el[i] *= 2
        el[i + 1] = 0
      }
    }
  }
}

const moveDown = () => {
  let row = []
  let finalRow = []
  let newBoard = []

  for (let i = 0; i < board.length; i++) {
    for (let k = 0; k < board[i].length; k++) {
      row.push(board[k][i])
    }
  }

  while (row.length > 0) {
    finalRow.push(row.splice(0, 4))
  }

  finalRow = finalRow.map(el => {
    el = filterEmpty(el)
    el.reverse()
    updateParams(el)
    el = filterEmpty(el)
    fillZero(el, 'push')
    el.reverse()
    return el
  })
  for (let i = 0; i < finalRow.length; i++) {
    for (let k = 0; k < finalRow[i].length; k++) {
      row.push(finalRow[k][i])
    }
  }
  while (row.length > 0) {
    newBoard.push(row.splice(0, 4))
  }
  board = newBoard
  console.dir(board)
}

const moveLeft = () => {
  board = board.map(el => {
    el = filterEmpty(el)
    updateParams(el)
    el = filterEmpty(el)
    fillZero(el, 'push')

    return el
  });
}

const moveUp = () => {
  let row = []
  let finalRow = []
  let newBoard = []

  for (let i = 0; i < board.length; i++) {
    for (let k = 0; k < board[i].length; k++) {
      row.push(board[k][i])
    }
  }

  while (row.length > 0) {
    finalRow.push(row.splice(0, 4))
  }

  finalRow = finalRow.map(el => {
    el = filterEmpty(el)
    updateParams(el)
    el = filterEmpty(el)
    fillZero(el, 'push')
    return el
  })
  for (let i = 0; i < finalRow.length; i++) {
    for (let k = 0; k < finalRow[i].length; k++) {
      row.push(finalRow[k][i])
    }
  }
  while (row.length > 0) {
    newBoard.push(row.splice(0, 4))
  }
  board = newBoard
}

const moveRight = () => {
  board = board.map(el => {
    el = filterEmpty(el)
    el.reverse()
    updateParams(el)
    el = filterEmpty(el)
    fillZero(el, 'push')
    el.reverse()
    return el
  });
}

const appendRandom = () => {
  let arr, el

  const randomArr = () => {
    arr = Math.floor(Math.random() * 4);
    return arr
  }

  const randomEl = () => {
    el = Math.floor(Math.random() * 4);
    return el
  }

  const randomNum = () => {
    el = Math.random() < 0.5 ? 2 : 4;
    return el
  }

  randomArr()
  randomEl()

  numbers[arr][el].classList.add('cell__number_new')
  if (board[arr][el] == 0) {
    board[arr][el] = randomNum()
  } else {
    appendRandom()
  }
}



document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    moveUp()
    appendRandom()
    updateBoard()
    console.log(board)
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    moveDown()
    appendRandom()
    updateBoard()
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    moveLeft()
    appendRandom()
    updateBoard()
  }
  if (e.key === 'ArrowRight') {
    e.preventDefault()
    moveRight() 
    appendRandom()
    updateBoard()
  }
})








/* function generateBoard() {
  gameField.innerHTML = ''
  board.forEach((row, rowNum) => {
    row.forEach((column, colNum) => {
      let cell = document.createElement('div');
      cell.classList.add('cell');
      let number = document.createElement('div');
      number.classList.add(`cell__number_${column}`);
      number.textContent = column;
      cell.appendChild(number)
      gameField.append(cell);
    });
  });
} */


// narabotki

/*     fillZero(el) */
/*     el = [el.reduce((value, element) => {
      if (element % 4 === 0) {
        return value + element
      } else {
        return element
      }
    })]
    fillZero(el) */

// sposob 1
/*   board.map((el, index) => {
    el.map((insideEl, insideIndex) => {
      if (insideEl) {
        if (el[insideIndex] === el[insideIndex + 1]) {
          el[insideIndex + 1] = el[insideIndex] * 2
          el[insideIndex] = 0;
        } else {
          el.splice(insideIndex, 1)
          el.splice(el.length, 0, insideEl);
        }
      }
    })
  }) */
// sposob 2