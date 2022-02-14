//---------|
// POINTER |
//---------|

mk.DRAG = {

  dragging: false,
  entity: null,
  x: null,
  y: null,
  xOffset: null,
  yOffset: null,

  startDragging: function(x, y, entity) {
    console.log('dragging', entity);
    this.dragging = true;
    this.x = x;
    this.y = y;
    this.entity = entity;
    this.xOffset = x - entity.x;
    this.yOffset = y - entity.y;
    game.saveCanvasDrawingArea();
  },

  stopDragging: function() {
    console.log('drug', this.entity);
    this.dragging = false;
    game.restoreCanvasDrawingArea(); // this is probably why the polygon goes back after we let go
  },

};

function pointerButtonOnclick(btn, e) {

}

function pointerMouseDown(x, y, e) {

  // Did I click on any shapes?
  var shapeTypes = mk.shapeTypes();
  for (var i = 0; i < shapeTypes.length; i++) {
    var type = shapeTypes[i];
    var shapes = game.getEntitiesByType(type);
    if (shapes) {
      for (const [id, shape] of Object.entries(shapes)) {
        shape.createPath(context);
        if (context.isPointInPath(x, y)) {
          var ctrl = mk.CANVAS_CTRL;
          ctrl.pointerEntity = shape;
          ctrl.refreshPointerEntityPane();
          mk.DRAG.startDragging(x, y, shape);
        }
      }
    }
  }

//  var circles;
//
//  var rectangles;
//
//  var polygons = game.getEntitiesByType('MkPolygon');
//  if (polygons) {
//    for (const [id, polygon] of Object.entries(polygons)) {
//      polygon.createPath(context);
//      if (context.isPointInPath(x, y)) {
//        mk.DRAG.startDragging(x, y, polygon);
//      }
//    }
//  }

}

function pointerMouseMove(loc, e) {

  if (mk.DRAG.dragging) {
//    console.log('dragging...');
//    var newX = loc.x - mk.DRAG.xOffset;
//    var newY = loc.y - mk.DRAG.yOffset;
//    console.log(newX, newY);
//    mk.DRAG.entity.x = loc.x - mk.DRAG.xOffset;
//    mk.DRAG.entity.y = loc.y - mk.DRAG.yOffset;

    mk.DRAG.entity.move(
//    game.getEntity('MkPolygon', 'foo').move(
      loc.x - mk.DRAG.xOffset,
      loc.y - mk.DRAG.yOffset
    );
    game.refreshCanvas();
  }

}

function pointerMouseUp(x, y, e) {

  if (mk.DRAG.dragging) {

    mk.DRAG.stopDragging();
//    game.refreshCanvas();


  }

}
