//---------|
// POLYGON |
//---------|

function polygonButtonOnclick(btn, e) {

}

function drawPolygonMouseDown(x, y, e) {
  if (!RUBBER_ORIGIN) {
    RUBBER_POLYGON = {};
    RUBBER_ORIGIN = new MkPoint(x, y);
    console.log('RUBBER_ORIGIN', 'polygon', RUBBER_ORIGIN);
    game.saveCanvasDrawingArea();
    RUBBER_DRAGGING = true;
  }
}

function drawPolygonMouseMove(loc, e) {
  game.restoreCanvasDrawingArea();
  updateRubberBand('polygon', loc);
}

function updateRubberBandPolygon(loc) {
  RUBBER_POLYGON.width = Math.abs(loc.x - RUBBER_ORIGIN.x);
//  RUBBER_POLYGON.height = Math.abs(loc.y - RUBBER_ORIGIN.y);
//  RUBBER_POLYGON.x = loc.x > RUBBER_ORIGIN.x ? RUBBER_ORIGIN.x : loc.x;
//  RUBBER_POLYGON.y = loc.y > RUBBER_ORIGIN.y ? RUBBER_ORIGIN.y : loc.y;
}

function drawRubberBandPolygon() {
  var polygon = RUBBER.drawnPolygon = new MkPolygon(
    RUBBER_ORIGIN.x,
    RUBBER_ORIGIN.y,
    RUBBER_POLYGON.width,
    8, // sides
    (Math.PI / 180) * 45 // startAngle (45)
  );
  context.beginPath();
  polygon.createPath();
  polygon.stroke();
  polygon.fill();
}

function drawPolygonMouseUp(x, y, e) {
  game.restoreCanvasDrawingArea();
  updateRubberBand('polygon', new MkPoint(x, y));
  RUBBER_DRAGGING = false;
}
