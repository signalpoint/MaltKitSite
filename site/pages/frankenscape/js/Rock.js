// ROCK

function initRock() {

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

    checkCollisions: function() {
      var shapeTypes = mk.shapeTypes();
      for (var i = 0; i < shapeTypes.length; i++) {
        var type = shapeTypes[i];
        var shapes = game.getEntitiesByType(type);
        if (shapes) {
          for (const [id, shape] of Object.entries(shapes)) {
            if (shape.type == 'Circle' && shape.id == myRock.id) { continue; } // Skip self.
            var collision = myRock.collidesWith(shape);
            if (collision.overlap) {
              console.log('bingo bango!');
            }
          }
        }
      }

    },

    do: function(entity, time) {

      if (entity.inFlight) {
        entity.elapsedFrameTime = (time - this.lastTime)/1000;
        entity.elapsedFlightTime = (time - entity.launchTime)/1000;
        this.applyGravity(entity.elapsedFlightTime);
        this.updateRockPosition(entity.elapsedFrameTime);
        this.checkCollisions();
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


}

