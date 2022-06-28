// let gesuredZone = document.querySelector("#board");

// gesuredZone.addEventListener(
//   "touchstart",
//   function (event) {
//     touchstartX = event.screenX;
//     touchstartY = event.screenY;
//   },
//   false
// );

// gesuredZone.addEventListener(
//   "touchend",
//   function (event) {
//     touchendX = event.screenX;
//     touchendY = event.screenY;
//     handleGesure();
//   },
//   false
// );

// function handleGesure() {
//   let swiped = "swiped: ";
//   if (touchendX < touchstartX) {
//     moveCellsLeft();
//   }
//   if (touchendX > touchstartX) {
//     moveCellsRight();
//   }
//   if (touchendY < touchstartY) {
//     moveCellsDown();
//   }
//   if (touchendY > touchstartY) {
//     moveCellsUp();
//   }
//   if (touchendY == touchstartY) {
//     console.log("touch");
//   }
// }

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const gestureZone = document.querySelector("#board");

gestureZone.addEventListener(
  "touchstart",
  function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  },
  false
);

gestureZone.addEventListener(
  "touchend",
  function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
  },
  false
);

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

  if (touchendY === touchstartY) {
    console.log("Tap");
  }
}
