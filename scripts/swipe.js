let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const gestureZone = document.querySelector("#board");

gestureZone.addEventListener("touchstart", touchStart);

gestureZone.addEventListener("touchend", touchEnd);

function touchStart(event) {
  gestureZone.removeEventListener("touchstart", touchStart);
  touchstartX = event.changedTouches[0].screenX;
  touchstartY = event.changedTouches[0].screenY;
}

function touchEnd(event) {
  gestureZone.removeEventListener("touchend", touchEnd);
  touchendX = event.changedTouches[0].screenX;
  touchendY = event.changedTouches[0].screenY;
  handleGesture();
}

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

  setTimeout(() => {
    gestureZone.addEventListener("touchstart", touchStart);

    gestureZone.addEventListener("touchend", touchEnd);
  }, 300);
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
