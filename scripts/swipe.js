let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

let gesuredZone = document.querySelector("#board");

gesuredZone.addEventListener(
  "touchstart",
  function (event) {
    touchstartX = event.screenX;
    touchstartY = event.screenY;
  },
  false
);

gesuredZone.addEventListener(
  "touchend",
  function (event) {
    touchendX = event.screenX;
    touchendY = event.screenY;
    handleGesure();
  },
  false
);

function handleGesure() {
  let swiped = "swiped: ";
  if (touchendX < touchstartX) {
    moveCellsLeft();
  }
  if (touchendX > touchstartX) {
    moveCellsRight();
  }
  if (touchendY < touchstartY) {
    moveCellsDown();
  }
  if (touchendY > touchstartY) {
    moveCellsUp();
  }
  if (touchendY == touchstartY) {
    console.log("touch");
  }
}
