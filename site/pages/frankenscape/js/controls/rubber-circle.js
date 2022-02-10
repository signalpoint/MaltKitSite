//--------|
// CIRCLE |
//--------|

function circleButtonOnclick(btn, e) {

}

function drawCircleMouseDown(x, y, e) {
  if (!RUBBER_ORIGIN) {
    RUBBER_CIRCLE = {};
    RUBBER_ORIGIN = new MkPoint(x, y);
    console.log('RUBBER_ORIGIN', 'circle', RUBBER_ORIGIN);
    game.saveCanvasDrawingArea();
    RUBBER_DRAGGING = true;
  }
}

function drawCircleMouseMove(loc, e) {
  game.restoreCanvasDrawingArea();
  updateRubberBand('circle', loc);
}

function updateRubberCircle(loc) {
  RUBBER_CIRCLE.width = Math.abs(loc.x - RUBBER_ORIGIN.x);
  RUBBER_CIRCLE.height = Math.abs(loc.y - RUBBER_ORIGIN.y);
  var angle, radius;
  if (RUBBER_ORIGIN.y === loc.y) { // Handle horizontol line (because we can't divide by zero).
    radius = Math.abs(loc.x - RUBBER_ORIGIN.x);
  }
  else {
    angle = Math.atan(RUBBER_CIRCLE.height / RUBBER_CIRCLE.width);
    radius = RUBBER_CIRCLE.height / Math.sin(angle);
  }
  RUBBER_CIRCLE.angle = angle;
  RUBBER_CIRCLE.radius = radius;
}

function drawRubberBandCircle(loc) {
  context.beginPath();
  context.arc(RUBBER_ORIGIN.x, RUBBER_ORIGIN.y, RUBBER_CIRCLE.radius, 0, Math.PI * 2, false);
  context.stroke();
}

function drawCircleMouseUp(x, y, e) {
  game.restoreCanvasDrawingArea();
  updateRubberBand('circle', new MkPoint(x, y));
  RUBBER_DRAGGING = false;
}
