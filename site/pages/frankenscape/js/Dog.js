class Dog extends MkSprite {

  constructor(id, entity) {
    super(id, entity);
  }

}

// DOG

var dogWidth = 64;
var dogHeight = 32;
var dogSpritePath = frankenscapePath + '/sprites/dog';

function initDog() {

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
        y: this.y + this.height * .49
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

}
