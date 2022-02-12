// TODO rename to var RUBBER = { origin: null, dragging: false, etc.};
// Keeps it all in one spot, and easier for devs.

var RUBBER_ORIGIN = null; // The MkPoint to track the origain of the rubber shape.
var RUBBER_DRAGGING = false;

var RUBBER_CIRCLE = null;
var RUBBER_RECTANGLE = null;
var RUBBER_POLYGON = null;

var RUBBER = {

  origin: null,
  stretching: false,
  shapeName: null,
  shape: null, // while stretching
  drawnShape: null, // after stretching

  mouseMovePolygon: null,
  drawnPolygon: null,

  clear: function() {
    this.origin = null;
    this.stretching = false;
    this.shapeName = null;
  }

};

function updateRubberBand(shape, loc) {
  switch (shape) {
    case 'circle': updateRubberCircle(loc); break;
    case 'rectangle': updateRubberBandRectangle(loc); break;
    case 'polygon': updateRubberBandPolygon(loc); break;
  }
  drawRubberBandShape(shape, loc);
}

function drawRubberBandShape(shape, loc) {
  switch (shape) {
    case 'circle': drawRubberBandCircle(loc); break;
    case 'rectangle': drawRubberBandRectangle(); break;
    case 'polygon': drawRubberBandPolygon(); break;
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
