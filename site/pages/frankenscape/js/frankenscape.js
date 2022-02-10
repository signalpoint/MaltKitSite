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
