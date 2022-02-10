mk.CanvasGame.prototype.initMouse = function() {

  // MOUSE MOVE

  canvas.addEventListener('mousemove', function(e) {

    e.preventDefault();

//    console.log(e.offsetX, e.offsetY);

    var x = e.offsetX;
    var y = e.offsetY;

    // Hang onto the last mouse coordinates.
    game.setMouseX(x);
    game.setMouseY(y);

    if (game.isPaused()) {

      switch (CANVAS_CTRL_OP) {

        case 'drawCircle':
          drawCircleMouseMove(x, y, e);
          break;

        case 'drawRectangle':
          drawRectangleMouseMove(x, y, e);
          break;

      }

    }

    // The game is not paused...

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

    // TODO now that we're using a "new Path2D()" when the shape moves, our usage of the
  // "const" shapes below no longer works!

    // circle - "mouse over"
//    myBall.ctx.fillStyle = context.isPointInPath(circle, e.offsetX, e.offsetY) ?
//      'red' : 'purple';

    // square - "mouse over"
//    mySquare.ctx.strokeStyle = context.isPointInPath(square, e.offsetX, e.offsetY) ?
//      'green' : 'blue';

  });

  // MOUSE DOWN

  canvas.addEventListener('mousedown', function(e) {

    e.preventDefault();
    var x = e.offsetX;
    var y = e.offsetY;

    console.log('click', x, y);

    if (game.isPaused()) {

      switch (CANVAS_CTRL_OP) {

        case 'drawCircle':
          drawCircleMouseDown(x, y, e);
          break;

        case 'drawRectangle':
          drawRectangleMouseDown(x, y, e);
          break;

        case 'drawPolygon':
          drawPolygonMouseDown(x, y, e); // TODO why are we calling a "click" handler here?
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
//    if (context.isPointInPath(circle, e.offsetX, e.offsetY)) {
//      console.log('inside circle');
//    }

    // Check whether click is inside square
//    if (context.isPointInPath(square, e.offsetX, e.offsetY)) {
//      console.log('inside square');
//    }

  });

  // MOUSE UP

  canvas.addEventListener('mouseup', function(e) {

    e.preventDefault();
    var x = e.offsetX;
    var y = e.offsetY;

    console.log('release', x, y);

    if (game.isPaused()) {

      switch (CANVAS_CTRL_OP) {

        case 'drawCircle':
          drawCircleMouseUp(x, y, e);
          break;

        case 'drawRectangle':
          drawRectangleMouseUp(x, y, e);
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
//    if (context.isPointInPath(circle, e.offsetX, e.offsetY)) {
//      console.log('inside circle');
//    }

    // Check whether click is inside square
//    if (context.isPointInPath(square, e.offsetX, e.offsetY)) {
//      console.log('inside square');
//    }

  });

};
