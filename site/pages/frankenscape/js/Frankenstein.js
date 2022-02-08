class Frankenstein extends MkSprite {

  constructor(id, entity) {
    super(id, entity);
  }

  // BEHAVIORS

  // TODO, don't use "get" here, it doesn't follow along w/ the concept of a "class" here!
  // e.g. fall() {}
  get fall() {
    return {
      animated: true,
      do: function(entity, time) {

        // Reposition
        entity.y += entity.velocityY / game.getFps();

        // Recalculate velocity
        entity.velocityY =
          game.getGravity() *
          (entity.animationTimer.getElapsedTime()/1000) *
          game.getPixelsPerMeter();

        // Hit bottom?
        if (entity.y > (game.getCanvas().height - entity.height)) {
          entity.animationTimer.stop();
          entity.velocityY = 0;
        }

      }
    };
  }

}

// FRANKENSTEIN

var frankensteinWidth = 32;
var frankensteinHeight = 64;
var frankenscapePath = 'site/pages/frankenscape';
var frankenscapeSpritePath = frankenscapePath + '/sprites/frankenstein';

function initFrank() {

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

}