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
  myFrankenstein = new Frankenstein('myFrankenstein', {

//    x: canvas.width / 2 - frankensteinWidth / 2, // start in the middle
    x: frankensteinWidth / 2, // start to the left
    y: canvas.height - frankensteinHeight, // start w/ feet on ground
    width: 32,
    height: 64,
    gravity: 0.05, // TODO this is likely deprecated

    maxThrowVelocity: 20,

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
  myFrankenstein.addBehavior({ // moveFrank

    lastTime: undefined,
//    lastTime: 0,

    animated: 1,

    updatePosition: function(elapsed) {

      // left

      // right
      myFrankenstein.x += myFrankenstein.vX * (elapsed/1000);
//      console.log('x', myFrankenstein.x);

      frankensteinCoordinatesBadge.innerHTML =
        Math.round(myFrankenstein.x) + ', ' + Math.round(myFrankenstein.y);

    },

    resetFrank: function() {
      console.log('resetting Frank!');
      myFrankenstein.x = myFrankenstein.width / 2;
    },

    do: function(entity, time) {

      if (this.animationTimer.isRunning()) {

//        console.log(this.animationTimer.getElapsedTime());

        var animationElapsed = this.animationTimer.getElapsedTime(),
          elapsed;

        if (this.lastTime !== undefined) {
          elapsed = animationElapsed - this.lastTime;
//          console.log('updatePosition(' + animationElapsed + ' - ' + this.lastTime + ')');
          this.updatePosition(elapsed);
        }

        if (entity.x < 0 || entity.x > canvas.width) { // Frank reached an edge...
          this.animationTimer.stop();
          this.resetFrank();
        }
        else { // Frank is still in the game area...
          if (this.animationTimer.isDone()) {
            this.animationTimer.stop();
            entity.animate('faceRight');
          }
        }

      }

      this.lastTime = animationElapsed;

    }

  });

  // ROCK

  // TODO turn into Projectile?
  // Not really, it's more of just turning an Entity into a Projectile. Because a Square could be
  // a projectile, a Sprite, etc.
  myRock = new Circle('myRock', {

    x: myFrankenstein.getHandPosition().x,
    y: myFrankenstein.getHandPosition().y,
    radius: 5,
    ctx: {
      fillStyle: 'gray',
      strokeStyle: 'black' // not working?
    },
    launchAngle: null,
    launchVelocity: null,
    launchTime: 0,
    elapsedFrameTime: 0,
    elapsedFlightTime: 0,

    // Frank
    inHand: true,

    // Dog
    inMouth: false,

    inFlight: false,
    onGround: false,

  });
  const rock = myRock.path2D();
  myRock.addBehavior({

    animated: 1,
    lastTime: 0,

    applyGravity: function(elapsed) {
      myRock.velocityY =
        (game.getGravity() * elapsed) -
        (myRock.launchVelocity * Math.sin(myRock.launchAngle));
    },

    updateRockPosition: function(updateDelta) {
      myRock.x += myRock.velocityX * (updateDelta) * game.ppm();
      myRock.y += myRock.velocityY * (updateDelta) * game.ppm();
      coordinatesBadge.innerHTML = [
        Math.round(myRock.x),
        Math.round(myRock.y)
      ].join(', ');
    },

    checkRockBounds: function() {

      if (myRock.y > (canvas.height - myRock.radius*2)) {
        console.log('hit the ground');
        myRock.inFlight = false;
        myRock.onGround = true;
        myRock.velocityY = 0;
      }

      if (myRock.x < 0 || myRock.x > (canvas.width - myRock.radius*2)) {
        console.log('hit the wall');
        myRock.velocityX = 0;
      }

      if (!myRock.velocityX && !myRock.velocityY) {
        this.animationTimer.stop();
      }

    },

    frankCanPickUpRock: function(entity) {
      return entity.x >= myFrankenstein.x && entity.x < (myFrankenstein.x + myFrankenstein.width);
    },

    do: function(entity, time) {

      if (entity.inFlight) {
        entity.elapsedFrameTime = (time - this.lastTime)/1000;
        entity.elapsedFlightTime = (time - entity.launchTime)/1000;
        this.applyGravity(entity.elapsedFlightTime);
        this.updateRockPosition(entity.elapsedFrameTime);
        this.checkRockBounds();
      }
      else if (entity.inHand) {
        entity.x = myFrankenstein.getHandPosition().x;
        entity.y = myFrankenstein.getHandPosition().y;
      }
      else if (entity.onGround) {
        if (this.frankCanPickUpRock(entity)) {
          console.log('picked it up!');
          entity.inHand = true;
          entity.onGround = false;
        }
      }
      else if (entity.inMouth) {
        entity.x = myDog.getMouthPosition().x;
        entity.y = myDog.getMouthPosition().y;
      }

      this.lastTime = time;

    }

  });

  // PENDULUM

  // TODO turn into Pendulum?
  myPendulum = new MkEntity('myPendulum', 'Pendulum', {
    x: canvas.width / 2,
    y: canvas.height / 10,
    pivotRadius: 7,
    weightX: canvas.width / 2, // x pos of the pendulum's weight
    weightY: canvas.height / 2, // y pos of the pendulum's weight
    weightRadius: 25,
    initialAngle: Math.PI/5,
    angle: Math.PI/5,
    rodLengthInPixels: 300
//    ctx: {
//    },
  });
  myPendulum.painter = {

    drawPivot: function(entity) {

      context.save();

      context.beginPath();
      context.shadowColor = undefined;
      context.fillStyle = 'white';
      context.arc(entity.x + entity.pivotRadius, entity.y, entity.pivotRadius / 2, 0, Math.PI*2, false);
      context.fill();
      context.stroke();

      context.beginPath();
      context.fillStyle = 'rgb(0,0,0,0.2)';
      context.arc(entity.x + entity.pivotRadius, entity.y, entity.pivotRadius, 0, Math.PI*2, false);
      context.fill();
      context.stroke();

      context.restore();

    },
    drawRod: function(entity) {

//      context.save();

      context.beginPath();

      context.moveTo(

        entity.x +
        entity.pivotRadius +
        entity.pivotRadius*Math.sin(entity.angle),

        entity.y +
        entity.pivotRadius*Math.cos(entity.angle)

      );
      context.lineTo(

        entity.weightX -
        entity.weightRadius*Math.sin(entity.angle),

        entity.weightY -
        entity.weightRadius*Math.cos(entity.angle),

      );

//      context.moveTo(0,0);
//      context.lineTo(420, 420);

      context.stroke();

//      context.restore();

    },
    drawWeight: function(entity) {

      context.save();

      context.beginPath();
      context.arc(entity.weightX, entity.weightY, entity.weightRadius, 0, Math.PI*2, false);
      context.clip();
      context.shadowColor = 'rgb(0,0,0)';
      context.shadowOffsetX = -4;
      context.shadowOffsetY = -4;
      context.shadowBlur = 8;
      context.lineWidth = 2;
      context.strokeStyle = 'rgb(100,100,195)';
      context.stroke();

      context.beginPath();
      context.arc(entity.weightX, entity.weightY, entity.weightRadius / 2, 0, Math.PI*2, false);
      context.clip();
      context.shadowColor = 'rgb(255,255,0)';
      context.shadowOffsetX = -4;
      context.shadowOffsetY = -4;
      context.shadowBlur = 8;
      context.stroke();

      context.restore();

    },

    paint: function(entity) {
      this.drawPivot(entity);
      this.drawRod(entity);
      this.drawWeight(entity);
      weightXBadge.innerHTML = Math.round(entity.weightX);
      weightYBadge.innerHTML = Math.round(entity.weightY);
      pendulumAngleBadge.innerHTML = parseFloat(entity.angle).toFixed(3);
    }

  };
  const pendulum = myPendulum.path2D();
  myPendulum.addBehavior({

    animated: 1,
    rodLength: 0.8, // 0.8ft

    do: function(entity, time) {

      if (!this.animationTimer.isRunning()) {
        this.animationTimer.start();
      }

      entity.angle = entity.initialAngle*Math.cos(
        Math.sqrt(game.getGravity()/this.rodLength)* (this.animationTimer.getElapsedTime() / 1000)
      );
      entity.weightX = entity.x + Math.sin(entity.angle)*entity.rodLengthInPixels;
      entity.weightY = entity.y + Math.cos(entity.angle)*entity.rodLengthInPixels;

    }

  });

  // DOG

  var dogWidth = 64;
  var dogHeight = 32;
  var dogSpritePath = frankenscapePath + '/sprites/dog';
  myDog = new Dog('myDog', {

    x: myFrankenstein.x + dogWidth * 2,
    y: canvas.height - dogHeight, // start w/ feet on ground
    width: dogWidth,
    height: dogHeight,

    maxRunVelocity: 30,

    sheets: {
      faceRight: {
        src: dogSpritePath + '/faceRight.png',
        img: null, // will be loaded
        width: 256,
        height: 32,
        frameWidth: dogWidth,
        frameHeight: dogHeight,
        frames: 4,
        rows: 1,
        cols: 4,
        row: 0,
        col: 0,
        currentFrame: 0
      },
      faceLeft: {
        src: dogSpritePath + '/faceLeft.png',
        img: null, // will be loaded
        width: 256,
        height: 32,
        frameWidth: dogWidth,
        frameHeight: dogHeight,
        frames: 4,
        rows: 1,
        cols: 4,
        row: 0,
        col: 0,
        currentFrame: 0
      },
    },
    sheet: 'faceLeft',

    getMouthPosition: function() {
      return {
        x: this.x + this.width * (this.isFacingRight() ? .89 : 0.11),
        y: this.y + this.height * .47
      };
    },

    isFacingRight: function() {
      return this.sheet === 'faceRight';
    },

    isFacingLeft: function () {
      return this.sheet === 'faceLeft';
    }

  });
  myDog.addBehavior({ // moveDog

    animated: 1,

    lastTime: undefined,
//    lastTime: 0,

    stayCloseLength: myFrankenstein.width * 4,
    onFranksRight: true,
    onFranksLeft: false,
    hasRock: false,

    updatePosition: function(elapsed) {

      // left

      // right
      myDog.x += myDog.vX * (elapsed/1000);
//      console.log('x', myDog.x);

    },

    determineSideOfFrank: function(entity) {
      if (entity.x - (myFrankenstein.x + myFrankenstein.width) >= 0) {
        this.onFranksRight = true;
        this.onFranksLeft = false;
      }
      else {
        this.onFranksRight = false;
        this.onFranksLeft = true;
      }
    },

    determineSideOfRock: function(entity) {
      if (
        !myRock.inHand && myRock.onGround
      ) {
        if (entity.isFacingRight()) {
//          console.log('facingRight', Math.round(entity.x) + entity.width + ' ?= ' + Math.round(myRock.x));
          if (Math.round(entity.x) + entity.width == Math.round(myRock.x)) {
            console.log('good boy! bring it back left');
            this.hasRock = true;
            myRock.inMouth = true;
            myRock.onGround = false;
          }
        }
        else if (entity.isFacingLeft()) {
//          console.log('facingLeft', Math.round(entity.x) + ' ?= ' + Math.round(myRock.x) + (myRock.radius * 2));
          if (Math.round(entity.x) == Math.round(myRock.x) + (myRock.radius * 2)) {
            console.log('good boy! bring it back right');
            this.hasRock = true;
            myRock.inMouth = true;
            myRock.onGround = false;
          }
        }
      }
      if (entity.x - (myRock.x + myRock.radius * 2) >= 0) {
        this.onRocksRight = true;
        this.onRocksLeft = false;
      }
      else {
        this.onRocksRight = false;
        this.onRocksLeft = true;
      }
    },

    movedTooFarRightOfFrank: function(entity) {
      return entity.x - (myFrankenstein.x + myFrankenstein.width) > this.stayCloseLength;
    },
    movedTooFarLeftOfFrank: function(entity) {
      return myFrankenstein.x - (entity.x + entity.width) > this.stayCloseLength;
    },

    do: function(entity, time) {

      this.determineSideOfFrank(entity);

      // If the rock is in Frank's hand, stay close to Frank.
      if (myRock.inHand) {

        // If the dog is on the right and moved too far away from Frank, come back left.
        if (this.onFranksRight) {

          if (this.movedTooFarRightOfFrank(entity)) {
            entity.sheet = 'faceLeft';
            entity.x--;
          }

        }
        else {

          // The dog is on the left of Frank and moved too far away, come back right.

          if (this.movedTooFarLeftOfFrank(entity)) {
            entity.sheet = 'faceRight';
            entity.x++;
          }

        }

      }
      else if (myRock.inFlight || myRock.onGround) {

        // The rock is in the air or on the ground...

        this.determineSideOfRock(entity);

//        console.log(Math.round(entity.x) + ' ?= ' + Math.round(myRock.x));

        // If the dog just picked up the rock
        if (this.hasRock) {
          console.log('got the rock!');
        }

        // If the dog is on the right of the rock, move left.
        else if (this.onRocksRight) {
          entity.sheet = 'faceLeft';
          entity.x--;
        }
        else {

          // The dog is on the left of the rock, move right.
          entity.sheet = 'faceRight';
          entity.x++;

        }

      }
      else if (myRock.inMouth) {

        // If the dog is on the right, bring the ball back to the left.
        if (this.onFranksRight) {
          entity.sheet = 'faceLeft';
          entity.x--;
        }
        else {

          // The dog is on the left of Frank, bring the ball back to the right.
          entity.sheet = 'faceRight';
          entity.x++;

        }

        // If the dog is close enough to Frank, drop the ball.
        if (
          entity.isFacingLeft() && Math.round(entity.x) == Math.round(myFrankenstein.x) + myFrankenstein.width
        ) {
          console.log('drop it!');
          myRock.inMouth = false;
          this.hasRock = false;
          myRock.inHand = true;
        }

      }




      if (this.animationTimer.isRunning()) {

        var animationElapsed = this.animationTimer.getElapsedTime(),
          elapsed;

        if (this.lastTime !== undefined) {
          elapsed = animationElapsed - this.lastTime;
          this.updatePosition(elapsed);
        }

        if (entity.x < 0 || entity.x > canvas.width) { // Frank reached an edge...
          this.animationTimer.stop();
          this.reset();
        }
        else { // Frank is still in the game area...
          if (this.animationTimer.isDone()) {
            this.animationTimer.stop();
            entity.animate('faceRight');
          }
        }

      }

      this.lastTime = animationElapsed;

    }

  });


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
