var game,
  launchAngle,
  launchVelocity,
  angleBadge,
  velocityBadge,
  coordinatesBadge = null;


//-------------
// 2D Game...
//-------------

function loadGame(canvasId) {

  game = new mk.CanvasGame(canvasId, '2d');

  game.setHeight(20); // Our game is 20 "meters" tall.

  angleBadge = document.getElementById('angleBadge');
  velocityBadge = document.getElementById('velocityBadge');
  coordinatesBadge = document.getElementById('coordinatesBadge');

  startGame();

}

function startGame() {

  const canvas = game.getCanvas();
  const ctx = canvas.getContext('2d');

//  pixelsPerMeter = (canvas.height - ledgeTop) / platformHeightInMeters;

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

  // Image
//  const myFrankenstein = new MkImage('myFrankenstein', {
//    x: 320,
//    y: 150,
//    width: 128,
//    height: 64,
//    src: 'games/sprite-sheet-frankenstein.png'
//  });

  // FRANKENSTEIN
  var frankensteinWidth = 32;
  var frankensteinHeight = 64;
  var frankenscapePath = 'site/pages/frankenscape';
  var frankenscapeSpritePath = frankenscapePath + '/sprites/frankenstein';
  const myFrankenstein = new Frankenstein('myFrankenstein', {

    x: canvas.width / 2 - frankensteinWidth / 2, // start in the middle
    y: canvas.height - frankensteinHeight, // start w/ feet on ground
    width: 32,
    height: 64,
    gravity: 0.05,

    maxThrowVelocity: 25,

    sheets: {
      faceRight: {
        src: frankenscapeSpritePath + '/faceRight.png',
        img: null, // will be loaded
        width: 64,
        height: 64,
        frameWidth: frankensteinWidth,
        frameHeight: frankensteinHeight,
        frames: 2,
        rows: 1,
        cols: 2,
        row: 0,
        col: 0,
        currentFrame: 0
      },
      walkRight: {
        src: frankenscapeSpritePath + '/walkRight.png',
        img: null, // will be loaded
        width: 128,
        height: 64,
        frameWidth: frankensteinWidth,
        frameHeight: frankensteinHeight,
        frames: 4,
        rows: 1,
        cols: 4,
        row: 0,
        col: 0,
        currentFrame: 0
      },
      faceLeft: {
        src: frankenscapeSpritePath + '/faceLeft.png',
        img: null, // will be loaded
        width: 64,
        height: 64,
        frameWidth: frankensteinWidth,
        frameHeight: frankensteinHeight,
        frames: 2,
        rows: 1,
        cols: 2,
        row: 0,
        col: 0,
        currentFrame: 0
      },
      walkLeft: {
        src: frankenscapeSpritePath + '/walkLeft.png',
        img: null, // will be loaded
        width: 128,
        height: 64,
        frameWidth: frankensteinWidth,
        frameHeight: frankensteinHeight,
        frames: 4,
        rows: 1,
        cols: 4,
        row: 0,
        col: 0,
        currentFrame: 0
      },
    },
    sheet: 'faceRight',

    getHandPosition: function() {
      return {
        x: this.x + this.width * .6,
        y: this.y + this.height * .8
      };
    },

  });

  // ROCK

  // TODO turn into Projectile?
  const myRock = new Circle('myRock', {
    x: myFrankenstein._getHandPosition().x,
    y: myFrankenstein._getHandPosition().y,
    radius: 5,
    ctx: {
      fillStyle: 'gray',
      strokeStyle: 'black' // not working?
    },
    inHand: true,
    inFlight: false,
    onGround: false,
    launchAngle: null,
    launchVelocity: null,
    launchTime: 0,
    elapsedFrameTime: 0,
    elapsedFlightTime: 0,
  });
  const rock = myRock.path2D();
  myRock.addBehavior({

    animated: 1,
    lastTime: 0,

    applyGravity: function(elapsed) {
      myRock.velocityY =
        (game.getGravity() * elapsed) -
        (myRock._launchVelocity * Math.sin(myRock._launchAngle));
    },

    updateRockPosition: function(updateDelta) {
      myRock.x += myRock.velocityX * (updateDelta) * game.ppm();
      myRock.y += myRock.velocityY * (updateDelta) * game.ppm();
      coordinatesBadge.innerHTML = [myRock.x, myRock.y].join(', ');
    },

    checkRockBounds: function() {

      if (myRock.y > (canvas.height - myRock.radius*2)) {
        console.log('hit the ground');
        myRock._inFlight = false;
        myRock._onGround = true;
        myRock.velocityY = 0;
      }

      if (myRock.x < 0 || myRock.x > (canvas.width - myRock.radius*2)) {
        console.log('hit the wall');
        myRock.velocityX = 0;
      }

      if (!myRock.velocityX && !myRock.velocityY) {
        myRock.animationTimer.stop();
      }

    },

    do: function(entity, time) {

      // TODO switch on  the "state" of an entity w/ just int values
      if (entity._inFlight) {
        entity._elapsedFrameTime = (time - this.lastTime)/1000;
        entity._elapsedFlightTime = (time - entity._launchTime)/1000;
        this.applyGravity(entity._elapsedFlightTime);
        this.updateRockPosition(entity._elapsedFrameTime);
        this.checkRockBounds();
      }
      else if (entity._inHand) {
        entity.x = myFrankenstein._getHandPosition().x;
        entity.y = myFrankenstein._getHandPosition().y;
      }
      else if (entity._onGround) {
        if (entity.x >= myFrankenstein.x && entity.x < (myFrankenstein.x + myFrankenstein.width)) {
          console.log('picked it up!');
          entity._inHand = true;
          entity._onGround = false;
        }
      }

      this.lastTime = time;

    }

  });

  // ADD ENTITIES TO GAME

  game.addEntities([
//    myBall,
//    mySquare,
    myFrankenstein,
    myRock,
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
    if (launchVelocity > myFrankenstein._maxThrowVelocity) {
      launchVelocity = myFrankenstein._maxThrowVelocity;
    }

    if (myRock._inHand) {

      myRock._launchAngle = launchAngle;
      myRock._launchVelocity = launchVelocity;

    }

    angleBadge.innerHTML = launchAngle;
    velocityBadge.innerHTML = launchVelocity;

    // circle - "mouse over"
//    myBall.ctx.fillStyle = ctx.isPointInPath(circle, event.offsetX, event.offsetY) ?
//      'red' : 'purple';

    // square - "mouse over"
//    mySquare.ctx.strokeStyle = ctx.isPointInPath(square, event.offsetX, event.offsetY) ?
//      'green' : 'blue';

//    game.refreshCanvas();

  });

  // mousedown
  canvas.addEventListener('mousedown', function(event) {

    event.preventDefault();

    console.log('click', event.offsetX, event.offsetY);

    if (myRock._inHand) {

      myRock.velocityX = myRock._launchVelocity * Math.cos(myRock._launchAngle);
      myRock.velocityY = myRock._launchVelocity * Math.sin(myRock._launchAngle);
      myRock._inHand = false;
      myRock._inFlight = true;
      myRock._launchTime = +new Date();
      console.log('THROW!', myRock.velocityX, myRock.velocityY);

    }

    // Check whether click is inside circle
//    if (ctx.isPointInPath(circle, event.offsetX, event.offsetY)) {
//      console.log('inside circle');
//    }

    // Check whether click is inside square
//    if (ctx.isPointInPath(square, event.offsetX, event.offsetY)) {
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
          myFrankenstein.animate('walkRight');
          myFrankenstein.moveRight(3);
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
      switch (keyCode) {
        case 87: // W
          break;
        case 65: // A
          myFrankenstein.animate('faceLeft');
          break;
        case 83: // S
          break;
        case 68: // D
          myFrankenstein.animate('faceRight');
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
      console.log(entity.type, id);
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

  // START ANIMATION TIMERS - For each entity that has at least one animated behavior...
  for (const [type, items] of Object.entries(game.getEntities())) {
    for (const [id, entity] of Object.entries(items)) {
//      var behaviors = entity.behaviors;
//      for (var i = 0; i < behaviors.length; i++) {
//        if (behaviors[i].animated) {
//          entity.animationTimer = new AnimationTimer();
//          break;
//        }
//      }
//      if (entity.animationTimer) { entity.animationTimer.start(); }
    }
  }

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

    if (game.getGameTime() > 60000) {

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
