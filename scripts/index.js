const startButton = document.querySelector(".start-button");
const rulesBlock = document.querySelector(".rules");
const boardBlock = document.querySelector('.board');

const openGame = () => {
  rulesBlock.classList.add('rules_hidden');
  boardBlock.classList.remove('board_hidden');
}

startButton.addEventListener("click", openGame);
