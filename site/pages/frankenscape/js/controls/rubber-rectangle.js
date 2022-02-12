//-----------|
// RECTANGLE |
//-----------|

function rectangleButtonOnclick(btn, e) {

}

function drawRectangleMouseDown(x, y, e) {

}

function drawRectangleMouseMove(loc, e) {
  updateRubberBand('rectangle', loc);
}

function updateRubberBandRectangle(loc) {
  RUBBER.shape.x = loc.x > RUBBER.origin.x ? RUBBER.origin.x : loc.x;
  RUBBER.shape.y = loc.y > RUBBER.origin.y ? RUBBER.origin.y : loc.y;
  RUBBER.shape.width = Math.abs(loc.x - RUBBER.origin.x);
  RUBBER.shape.height = Math.abs(loc.y - RUBBER.origin.y);
//  RUBBER.shape.x = loc.x > RUBBER.origin.x ? RUBBER.origin.x : loc.x;
//  RUBBER.shape.y = loc.y > RUBBER.origin.y ? RUBBER.origin.y : loc.y;
}

function drawRubberBandRectangle() {

  var entity = {
    x: RUBBER.origin.x,
    y: RUBBER.origin.y,
    width: RUBBER.shape.width,
    height: RUBBER.shape.height
  };

  var rectangleId = 'foo';
  var rectangle = new MkRectangle(rectangleId, entity);
  rectangle.draw();

//  context.beginPath();
//  context.moveTo(RUBBER.origin.x, RUBBER.origin.y);
//  context.strokeRect(RUBBER.shape.x, RUBBER.shape.y, RUBBER.shape.width, RUBBER.shape.height);
//  context.stroke();

  RUBBER.drawnShape = rectangle;

}

function drawRectangleMouseUp(x, y, e) {
  updateRubberBand('rectangle', new MkPoint(x, y));
}
