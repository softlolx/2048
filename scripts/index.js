const startButton = document.querySelector(".start-button");
const rulesBlock = document.querySelector(".rules");

function hideRules() {
  rulesBlock.classList.add("rules_hidden");
}

startButton.addEventListener("click", hideRules);
