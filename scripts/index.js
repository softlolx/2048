const startButton = document.querySelector(".start-button");
const rulesBlock = document.querySelector(".rules");
const boardBlock = document.querySelector('.board');

const openGame = () => {
  rulesBlock.classList.add('rules_hidden');
  boardBlock.classList.remove('board_hidden');
}

startButton.addEventListener("click", openGame);

let board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]

let b
let board2 = [
  Array.from(document.querySelector('#row-1').children),
  Array.from(document.querySelector('#row-2').children),
  Array.from(document.querySelector('#row-3').children),
  Array.from(document.querySelector('#row-4').children)
]

console.log(board2)

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
    updateParams(el)
    el = filterEmpty(el)
    fillZero(el, 'unshift')
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
  console.log(board)
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
  console.dir(board)
}

const moveRight = () => {
  board = board.map(el => {
    el = filterEmpty(el)
    updateParams(el)
    el = filterEmpty(el)
    fillZero(el, 'unshift')

    return el
  });
  console.log(board)
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

  randomArr()
  randomEl()

  console.log(board[arr][el])

  while(board[arr][el] !== 0) {
    randomArr()
    randomEl()
  }

  board[arr][el] = 2
}



document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    moveUp()
    appendRandom()
  }
  if (e.key === 'ArrowDown') {
    moveDown()
    appendRandom()
  }
  if (e.key === 'ArrowLeft') {
    moveLeft()
    appendRandom()
  }
  if (e.key === 'ArrowRight') {
    moveRight()
    appendRandom()
  }
})









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