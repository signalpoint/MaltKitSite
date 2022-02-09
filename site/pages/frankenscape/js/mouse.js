mk.CanvasGame.prototype.initMouse = function() {

  console.log('init mouse');

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

    if (game.isPaused()) { return; }

    // Rock angle and velocity.
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
    angleBadge.innerHTML = parseFloat(launchAngle).toFixed(3);
    velocityBadge.innerHTML = parseFloat(launchVelocity).toFixed(1);

    // circle - "mouse over"
//    myBall.ctx.fillStyle = context.isPointInPath(circle, event.offsetX, event.offsetY) ?
//      'red' : 'purple';

    // square - "mouse over"
//    mySquare.ctx.strokeStyle = context.isPointInPath(square, event.offsetX, event.offsetY) ?
//      'green' : 'blue';

  });

  // mousedown
  canvas.addEventListener('mousedown', function(event) {

    event.preventDefault();

    console.log('click', event.offsetX, event.offsetY);

    if (game.isPaused()) {

      switch (CANVAS_CTRL_OP) {

        case 'drawPolygon':
          console.log('draw a polygon dude');
          break;

      }

      return;

    }

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

};
