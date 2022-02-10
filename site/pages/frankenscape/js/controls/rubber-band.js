var RUBBER_ORIGIN = null; // The MkPoint to track the origain of the rubber shape.
var RUBBER_DRAGGING = false;

var RUBBER_CIRCLE = null;
var RUBBER_RECTANGLE = null;

function updateRubberBand(shape, loc) {
  switch (shape) {
    case 'circle': updateRubberCircle(loc); break;
    case 'rectangle': updateRubberBandRectangle(loc); break;
  }
  drawRubberBandShape(shape, loc);
}

function drawRubberBandShape(shape, loc) {
  switch (shape) {
    case 'circle': drawRubberBandCircle(loc); break;
    case 'rectangle': drawRubberBandRectangle(); break;
  }
}

//-------------|
// GUIDE WIRES |
//-------------|

function drawGuideWires(loc) {
  context.save();
  context.strokeStyle = 'red';
  context.lineWidth = 0.5
  drawVerticalLine(loc.x);
  drawHorizontalLine(loc.y);
  context.restore();
}

function drawVerticalLine(x) {
  context.beginPath();
  context.moveTo(x + 0.5, 0);
  context.lineTo(x + 0.5, canvas.height);
  context.stroke();
}

function drawHorizontalLine(y) {
  context.beginPath();
  context.moveTo(0, y + 0.5);
  context.lineTo(canvas.width, y + 0.5);
  context.stroke();
}

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

function drawCircleMouseMove(x, y, e) {
  if (RUBBER_DRAGGING) {
    game.restoreCanvasDrawingArea();
    var loc = new MkPoint(x, y);
    updateRubberBand('circle', loc);
    drawGuideWires(loc);
  }
}

function updateRubberCircle(loc) {
  RUBBER_CIRCLE.width = Math.abs(loc.x - RUBBER_ORIGIN.x);
  RUBBER_CIRCLE.height = Math.abs(loc.y - RUBBER_ORIGIN.y);
  var angle, radius;
  if (RUBBER_ORIGIN.y === loc.y) {
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
  console.log('drawRubberBandCircle', loc, RUBBER_CIRCLE);

  context.beginPath();
  context.arc(RUBBER_ORIGIN.x, RUBBER_ORIGIN.y, RUBBER_CIRCLE.radius, 0, Math.PI * 2, false);
  context.stroke();
}

function drawCircleMouseUp(x, y, e) {
  game.restoreCanvasDrawingArea();
  updateRubberBand('circle', new MkPoint(x, y));
  RUBBER_DRAGGING = false;
}

//-----------|
// RECTANGLE |
//-----------|

function rectangleButtonOnclick(btn, e) {

}

function drawRectangleMouseDown(x, y, e) {
  if (!RUBBER_ORIGIN) {
    RUBBER_RECTANGLE = {};
    RUBBER_ORIGIN = new MkPoint(x, y);
    console.log('RUBBER_ORIGIN', 'square', RUBBER_ORIGIN);
    game.saveCanvasDrawingArea();
    RUBBER_DRAGGING = true;
  }
}

function drawRectangleMouseMove(x, y, e) {
  if (RUBBER_DRAGGING) {
    game.restoreCanvasDrawingArea();
    var loc = new MkPoint(x, y);
    updateRubberBand('rectangle', loc);
    drawGuideWires(loc);
  }
}

function updateRubberBandRectangle(loc) {
  RUBBER_RECTANGLE.width = Math.abs(loc.x - RUBBER_ORIGIN.x);
  RUBBER_RECTANGLE.height = Math.abs(loc.y - RUBBER_ORIGIN.y);
  RUBBER_RECTANGLE.x = loc.x > RUBBER_ORIGIN.x ? RUBBER_ORIGIN.x : loc.x;
  RUBBER_RECTANGLE.y = loc.y > RUBBER_ORIGIN.y ? RUBBER_ORIGIN.y : loc.y;
}

function drawRubberBandRectangle() {
  context.beginPath();
  context.moveTo(RUBBER_ORIGIN.x, RUBBER_ORIGIN.y);
  context.strokeRect(RUBBER_RECTANGLE.x, RUBBER_RECTANGLE.y, RUBBER_RECTANGLE.width, RUBBER_RECTANGLE.height);
  context.stroke();
}

function drawRectangleMouseUp(x, y, e) {
  game.restoreCanvasDrawingArea();
  updateRubberBand('rectangle', new MkPoint(x, y));
  RUBBER_DRAGGING = false;
}
