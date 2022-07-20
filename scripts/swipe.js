let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const gestureZone = document.querySelector("#board");

function touchstart(event) {
  // gestureZone.removeEventListener("touchstart", touchstart);
  touchstartX = event.changedTouches[0].screenX;
  touchstartY = event.changedTouches[0].screenY;
}

function touchEnd(event) {
  touchendX = event.changedTouches[0].screenX;
  touchendY = event.changedTouches[0].screenY;
  handleGesture();
}

gestureZone.addEventListener("touchstart", touchstart, once);

gestureZone.addEventListener("touchend", touchEnd);

function handleGesture() {
  if (touchendX < touchstartX) {
    moveCellsLeft();
  }

  if (touchendX > touchstartX) {
    moveCellsRight();
  }

  if (touchendY < touchstartY) {
    moveCellsUp();
  }

  if (touchendY > touchstartY) {
    moveCellsDown();
  }
}

// gestureZone.addEventListener(
//   "touchend",
//   function (event) {
//     touchendX = event.changedTouches[0].screenX;
//     touchendY = event.changedTouches[0].screenY;
//     handleGesture();
//   },
//   false
// );
