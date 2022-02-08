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

  // TODO now that we're using a "new Path2D()" when the shape moves, our usage of the
  // "const" shapes below no longer works!

  // mousemove
  canvas.addEventListener('mousemove', function(event) {

    event.preventDefault();

//    console.log(event.offsetX, event.offsetY);

    var x = event.offsetX;
    var y = event.offsetY;

    // Hang onto the last mouse coordinates.
    game.setMouseX(x);
    game.setMouseY(y);

    var deltaX = Math.abs(x - myFrankenstein.x);
    var deltaY = Math.abs(y - myFrankenstein.y);

    var launchAngle = Math.atan(parseFloat(deltaY) / parseFloat(deltaX));
    var launchVelocity = 4 * deltaY / Math.sin(launchAngle) / game.ppm();
    if (launchVelocity > myFrankenstein.maxThrowVelocity) {
      launchVelocity = myFrankenstein.maxThrowVelocity;
    }

    if (myRock.inHand) {

      myRock.launchAngle = launchAngle;
      myRock.launchVelocity = launchVelocity;

    }

//    angleBadge.innerHTML = launchAngle;
//    velocityBadge.innerHTML = launchVelocity;

//    angleBadge.innerHTML = Math.round(launchAngle, 3);
//    velocityBadge.innerHTML = Math.round(launchVelocity, 1);

    angleBadge.innerHTML = parseFloat(launchAngle).toFixed(3);
    velocityBadge.innerHTML = parseFloat(launchVelocity).toFixed(1);

    // circle - "mouse over"
//    myBall.ctx.fillStyle = context.isPointInPath(circle, event.offsetX, event.offsetY) ?
//      'red' : 'purple';

    // square - "mouse over"
//    mySquare.ctx.strokeStyle = context.isPointInPath(square, event.offsetX, event.offsetY) ?
//      'green' : 'blue';

//    game.refreshCanvas();

  });

  // mousedown
  canvas.addEventListener('mousedown', function(event) {

    event.preventDefault();

    console.log('click', event.offsetX, event.offsetY);

    if (myRock.inHand) {

      // TODO shouldn't this start the throw behavior's animationTimer?

      myRock.velocityX = myRock.launchVelocity * Math.cos(myRock.launchAngle);
      myRock.velocityY = myRock.launchVelocity * Math.sin(myRock.launchAngle);
      myRock.inHand = false;
      myRock.inFlight = true;
      myRock.launchTime = +new Date();
      console.log('THROW!', myRock.velocityX, myRock.velocityY);

    }

    // Check whether click is inside circle
//    if (context.isPointInPath(circle, event.offsetX, event.offsetY)) {
//      console.log('inside circle');
//    }

    // Check whether click is inside square
//    if (context.isPointInPath(square, event.offsetX, event.offsetY)) {
//      console.log('inside square');
//    }

  });

  // KEYBOARD CONTROLS

  // Keys we care about (for now).
  var keyCodes = [
    87, // W
    65, // A
    83, // S
    68, // D
    32, // SPACEBAR
  ];

  // KEY DOWN
  window.addEventListener("keydown", function (event) {

    var keyCode = event.keyCode;
    if (keyCodes.includes(keyCode)) {

      event.preventDefault();

      if (keysDown[keyCode]) {

        // The key is already pressed....

        console.log('prevented key down: ' + keyCode);

        return;

      }

      // Track the time the key code was pressed and push it onto the stack.
      keysDown[keyCode] = {
        time: +new Date(),
      };
      keysDownStack.push(keyCode);

      switch (keyCode) {

        case 87: // W
          //myFrankenstein.moveUp(1);
          break;

        case 65: // A
          myFrankenstein.animate('walkLeft');
          myFrankenstein.moveLeft(3);
          break;

        case 83: // S
          //myFrankenstein.moveDown(5);
          break;

        case 68: // D

//          myFrankenstein.animate('walkRight');
//          myFrankenstein.moveRight(3);

          if (!myFrankenstein.behaviors[0].animationTimer.isRunning()) {

            myFrankenstein.vX = 20;

            myFrankenstein.behaviors[0].animationTimer.duration = 2000;

            var timeWarp = null;
            switch (timeWarpSelect.value) {

              case 'linear':
              case 'easeInOut':
                timeWarp = AnimationTimer[timeWarpSelect.value]();
                break;

              case 'easeIn':
              case 'easeOut':
                timeWarp = AnimationTimer[timeWarpSelect.value](timeWarpStrength.value);
                break;

              case 'elastic':
                timeWarp = AnimationTimer[timeWarpSelect.value](timeWarpPasses.value);
                break;

              case 'bounce':
                timeWarp = AnimationTimer[timeWarpSelect.value](timeWarpBounces.value);
                break;

            }

            myFrankenstein.behaviors[0].animationTimer.timeWarp = timeWarp;
            myFrankenstein.animate('walkRight');
            myFrankenstein.behaviors[0].animationTimer.start();

          }
          else {

            myFrankenstein.behaviors[0].animationTimer.reset();

          }

          break;

        case 32: // SPACEBAR
//          myFrankenstein.animate('crouch');
          break;

      }
    }
  }
  , false);

  // KEY UP
  window.addEventListener("keyup", function (event) {

    var keyCode = event.keyCode;
    if (keyCodes.includes(keyCode)) {

      event.preventDefault();

      delete keysDown[keyCode];
      var index = keysDownStack.indexOf(keyCode);
      if (index !== -1) { keysDownStack.splice(index, 1); }

      switch (keyCode) {

        case 87: // W
          break;

        case 65: // A
          myFrankenstein.animate('faceLeft');
          break;

        case 83: // S
          break;

        case 68: // D
//          myFrankenstein.animate('faceRight');
          break;

        case 32: // SPACEBAR
//          myFrankenstein.animate('jump');
          myFrankenstein.moveUp(myFrankenstein.height / 2);
          myFrankenstein.addBehavior(myFrankenstein.fall);
          break;

      }
    }
  }, false);



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
