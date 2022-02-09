var game, // required
  canvas, // required
  context, // required

  keysDown = {},
  keysDownStack = [],

  myFrankenstein,
  myRock,
  myPendulum,
  myDog,

  frankensteinCoordinatesBadge,
  timeWarpSelect,
  timeWarpStrength,
  timeWarpPasses,
  timeWarpBounces,

  launchAngle,
  launchVelocity,

  angleBadge,
  velocityBadge,
  coordinatesBadge = null,

  weightXBadge,
  weightYBadge,
  pendulumAngleBadge = null;

//-------------
// 2D Game...
//-------------

function loadGame(canvasId) {

  game = new mk.CanvasGame(canvasId, '2d');

  game.setHeight(20); // Our game is 20 "meters" tall.

  initCanvasControls();

  frankensteinCoordinatesBadge = document.getElementById('frankensteinCoordinatesBadge');
  timeWarpSelect = document.getElementById('timeWarpSelect');
  timeWarpStrength = document.getElementById('timeWarpStrength');
  timeWarpPasses = document.getElementById('timeWarpPasses');
  timeWarpBounces = document.getElementById('timeWarpBounces');

  // Ball Badges
  angleBadge = document.getElementById('angleBadge');
  velocityBadge = document.getElementById('velocityBadge');
  coordinatesBadge = document.getElementById('coordinatesBadge');

  // Pendulum Badges
  weightXBadge = document.getElementById('weightXBadge');
  weightYBadge = document.getElementById('weightYBadge');
  pendulumAngleBadge = document.getElementById('pendulumAngleBadge');

  timeWarpSelectRefreshInputs();

  startGame();

}

function startGame() {

//  const canvas = game.getCanvas();
//  const ctx = canvas.getContext('2d');

  // GAME ENTITIES

  // BALL

  const myBall = new Circle('myBall', {
    x: 150,
    y: 75,
    radius: 50,
    gravity: 0.05,
    ctx: {
      fillStyle: 'purple'
    }
  });
  const circle = myBall.path2D();
  myBall.addBehavior(myBall.fall);

  // SQUARE

  const mySquare = new Square('mySquare', {
    x: 420,
    y: 220,
    length: 75,
    gravity: 0.03,
    ctx: {
      strokeStyle: 'blue'
    }
  });
  const square = mySquare.path2D();
  mySquare.addBehavior(mySquare.fall);

  // INITIALIZE ENTITIES

  initFrank();
  initRock();
  initPendulum();
  initDog();

  // ADD ENTITIES TO GAME

  game.addEntities([
//    myBall,
//    mySquare,
    myFrankenstein,
    myRock,
//    myPendulum,
    myDog,
  ]);

  // EVENT LISTENERS

  game.initMouse();

  game.initKeyboard();

  // LOAD MEDIA - For each entity...
  // TODO don't move forward until all media is loaded
  for (const [type, items] of Object.entries(game.getEntities())) {
    for (const [id, entity] of Object.entries(items)) {
//      console.log(entity.type, id);
      switch (entity.type) {

          case 'Image':
            break;

          case 'Sprite':

            entity.loadSheets(function () {

              console.log('done loading sprite sheets');

            });

            break;

      }
    }
  }

  // START GAME TIME

  game.setStartTime(game.getTimeNow());

  // Request the animation frame

  window.requestAnimationFrame(function(time) {

    update(time);

  });

}

function stopGame() {
//  clearInterval(this.interval);
}


function update(time) {

  if (game.isPaused()) {

    setTimeout(function() {

      update(time);

    }, 100);

  }
  else {

    if (game.getGameTime() > 60 * 1000) {

      console.log('Times up!');
      stopGame();

    }
    else {

      game.tick();
      game.refreshCanvas();

      window.requestAnimationFrame(function(time) {
        update(time);
      });

    }

  }

}

function timeWarpSelectOnchange(select) {

  timeWarpSelectRefreshInputs();
}

function timeWarpSelectRefreshInputs() {

  timeWarpStrength.disabled = true;
  timeWarpPasses.disabled = true;
  timeWarpBounces.disabled = true;

  switch (timeWarpSelect.value) {

    case 'linear':
      break;

    case 'easeIn':
      timeWarpStrength.disabled = false;
      break;

    case 'easeOut':
      timeWarpStrength.disabled = false;
      break;

    case 'easeInOut':
      break;

    case 'elastic':
      timeWarpPasses.disabled = false;
      break;

    case 'bounce':
      timeWarpBounces.disabled = false;
      break;

  }

}

/**
 * CANVAS CONTROLS
 */

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

function drawPolygonOnclick(btn) {
}
