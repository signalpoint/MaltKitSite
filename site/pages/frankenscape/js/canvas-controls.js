var CANVAS_CTRL_OP = null; // play, pause, drawPolygon, etc

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

  // Handle hover for play/pause button.
//  var btn = getCanvasButton('togglePlay');
//  var showPlay = function(btn) {
//    var i = btn.querySelector('svg');
//    i.classList.remove('fa-pause');
//    i.classList.add('fa-play');
//    btn.setAttribute('title', 'Play');
//    btn.setAttribute('data-action', 'play');
//  };
//  var showPause = function(btn) {
//    var i = btn.querySelector('svg');
//    i.classList.remove('fa-play');
//    i.classList.add('fa-pause');
//    btn.setAttribute('title', 'Pause');
//    btn.setAttribute('data-action', 'pause');
//  };
//  btn.addEventListener('mouseover', function(e) {
//    game.isPaused() ? showPlay(this) : showPause(this);
//  });
//  btn.addEventListener('mouseout', function(e) {
//    game.isPaused() ? showPause(this) : showPlay(this);
//  });

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

    // If the pressed play, un-pause the game, disable the play button,
    // and enable the pause button.
    if (op === 'play') {
      game.togglePause();
      btn.disabled = true;
      getCanvasButton('pause').disabled = false;
    }

  }
  else {

    // They are playing the game...

    // Pause the game, disable the pause button,
    // and enable the play button.
    game.togglePause();
    getCanvasButton('pause').disabled = true;
    getCanvasButton('play').disabled = false;


  }

  switch (op) {

    case 'play':
      playButtonOnclick(this);
      break;

    case 'pause':
      pauseButtonOnclick(this);
      break;

    case 'grid':
      gridButtonOnclick(this);
      break;

    case 'drawPolygon':
      drawPolygonOnclick(this);
      break;

  }

}

function removeHighlightFromControlButtons() {
  var buttons = getCanvasButtons();
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('btn-dark');
  }
}

function playButtonOnclick(btn) {
}

function pauseButtonOnclick(btn) {
}

function gridButtonOnclick(btn) {
  
}

function drawPolygonOnclick(btn) {
}

function drawPolygonClickHandler(x, y, e) {
  //centerX, centerY, radius, sides, startAngle, ctx
  var point = new MkPoint(x, y);
  var polygon = new MkPolygon();
}
