//-----------|
// RECTANGLE |
//-----------|

function rectangleButtonOnclick(btn, e) {

}

function drawRectangleMouseDown(x, y, e) {
  if (!RUBBER_ORIGIN) {
    RUBBER_RECTANGLE = {};
    RUBBER_ORIGIN = new MkPoint(x, y);
    console.log('RUBBER_ORIGIN', 'rectangle', RUBBER_ORIGIN);
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
