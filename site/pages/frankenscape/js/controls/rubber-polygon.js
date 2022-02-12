//---------|
// POLYGON |
//---------|

function polygonButtonOnclick(btn, e) {

}

function drawPolygonMouseDown(x, y, e) {

}

function drawPolygonMouseMove(loc, e) {
  updateRubberBand('polygon', loc);
}

function updateRubberBandPolygon(loc) {
  RUBBER.shape.width = Math.abs(loc.x - RUBBER.origin.x);
}

function drawRubberBandPolygon() {

  var entity = {
    x: RUBBER.origin.x,
    y: RUBBER.origin.y,
    radius: RUBBER.shape.width,
    sides: 5,
    startAngle: (Math.PI / 180) * 45
  };

  var polygonId = 'foo';
  var polygon = new MkPolygon(polygonId, entity);
  context.beginPath(); // TODO why start the path here? seems like that'd happen in paint/draw!
  polygon.createPath();
  polygon.stroke();
  polygon.fill();
  // TODO closePath()????

  RUBBER.drawnShape = polygon;

}

function drawPolygonMouseUp(x, y, e) {
  updateRubberBand('polygon', new MkPoint(x, y));
}
