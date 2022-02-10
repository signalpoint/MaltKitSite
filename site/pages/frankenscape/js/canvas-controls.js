var CANVAS_CTRL_OP = null; // drawPolygon, etc

function getCanvasButtons() {
  return document.querySelectorAll('#canvasControls button');
}
function getCanvasButton(op) {
  return document.querySelector('#canvasControls button[data-op="' + op + '"]');
}
function getCanvasActiveButton() {
  return document.querySelectorAll('#canvasControls button.active');
}

function initCanvasControls() {

  // Add click listeners to buttons.
  var buttons = getCanvasButtons();
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', canvasControlBtnOnclick, true);
  }

}

function canvasControlBtnOnclick(e) {

  var btn = this;
  var op = btn.getAttribute('data-op');
  CANVAS_CTRL_OP = op;

  // Remove border from all buttons, then add a border to this button.
  removeHighlightFromControlButtons();
  btn.classList.add('active');
  btn.classList.add('btn-dark');

  if (game.isPaused()) {

    // The game is paused...

  }
  else {

    // They are playing the game...

    // Pause the game no matter what button is clicked, except for the grid toggle.
    if (op != 'toggleGrid') {
      getPlaybackButton('pause').click();
    }

  }

  switch (op) {

    case 'toggleGrid':
      gridButtonOnclick(this);
      break;

    case 'drawRectangle':
      rectangleButtonOnclick(this, e);
      break;

    case 'drawPolygon':
      drawPolygonOnclick(this, e);
      break;

  }

}

function removeHighlightFromControlButtons() {
  var buttons = getCanvasButtons();
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('btn-dark');
  }
}

function drawPolygonOnclick(btn, e) {
}

function drawPolygonMouseDown(x, y, e) {
  //centerX, centerY, radius, sides, startAngle, ctx
  var point = new MkPoint(x, y);
  var polygon = new MkPolygon();
}
