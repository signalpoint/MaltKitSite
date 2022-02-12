//--------|
// CIRCLE |
//--------|

function circleButtonOnclick(btn, e) {

}

function drawCircleMouseDown(x, y, e) {

}

function drawCircleMouseMove(loc, e) {
  updateRubberBand('circle', loc);
}

function updateRubberCircle(loc) {
  RUBBER.shape.width = Math.abs(loc.x - RUBBER.origin.x);
  RUBBER.shape.height = Math.abs(loc.y - RUBBER.origin.y);
  var angle, radius;
  if (RUBBER.origin.y === loc.y) { // Handle horizontol line (because we can't divide by zero).
    radius = Math.abs(loc.x - RUBBER.origin.x);
  }
  else {
    angle = Math.atan(RUBBER.shape.height / RUBBER.shape.width);
    radius = RUBBER.shape.height / Math.sin(angle);
  }
  RUBBER.shape.angle = angle;
  RUBBER.shape.radius = radius;
}

function drawRubberBandCircle(loc) {

  var entity = {
    x: RUBBER.origin.x,
    y: RUBBER.origin.y,
    radius: RUBBER.shape.width
  };

  var circleId = 'foo';
  var circle = new Circle(circleId, entity);
  circle.draw();

//  context.beginPath();
//  context.arc(RUBBER.origin.x, RUBBER.origin.y, RUBBER.shape.radius, 0, Math.PI * 2, false);
//  context.stroke();

  RUBBER.drawnShape = circle;

}

function drawCircleMouseUp(x, y, e) {
  updateRubberBand('circle', new MkPoint(x, y));
}
