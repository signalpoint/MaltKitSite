var CANVAS_CTRL_OP = null; // drawPolygon, etc

mk.CANVAS_CTRL = {

  // PANES
  panes: null,
  getPane: function(op) {
    return document.querySelector('#canvasControlPanes .canvas-control-pane[data-op="' + op + '"]');
  },
  showPane: function(op) {
    console.log('showing pane: ' + op);
    this.getPane(op).classList.remove('d-none');
  },
  hidePanes: function() {
    for (var i = 0; i < this.panes.length; i++) {
      this.panes[i].classList.add('d-none');
    }
  },

  // POINTER
  pointerEntity: null,
  refreshPointerEntityPane: function() {
    document.getElementById('pointerEntityPane').innerHTML = this.renderEntityPane();
  },

  // ENTITY
  renderEntityPane: function() {

    var entity = this.pointerEntity;
    var html = '';

    var items = [];

//    id
//    type
//    x
//    y
//    vX
//    vY
//    gravity
//    animationTimer

    for (const [property, value] of Object.entries(entity)) {
      // TODO render each property w/ a widget to tweak it!
      // Careful though, the widget to edit it should be the same as when you're drawing it
      var item = '';
      item += '<li class="list-group-item"><strong>' + property + '</strong>: ';
      if (Array.isArray(value)) {
        var pieces = [];
        for (var i = 0; i < value.length; i++) {
          pieces.push(JSON.stringify(value[i]));
        }
        item += pieces.join(', ');
      }
      else {
        item += value;
      }
      item += '</li>';
      items.push(item);
    }

    html += '<ul class="list-group mb-1">' + items.join('') + '</ul>';

    // Code
    html += '<pre>' + JSON.stringify(entity) + '</pre>';

    return html;

  }

};

function getCanvasButtons() {
  return document.querySelectorAll('#canvasControls button');
}
function getCanvasButton(op) {
  return document.querySelector('#canvasControls button[data-op="' + op + '"]');
}
function getCanvasActiveButton() {
  return document.querySelectorAll('#canvasControls button.active');
}

function initCanvasControls() {

  // Add click listeners to buttons.
  var buttons = getCanvasButtons();
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', canvasControlBtnOnclick, true);
  }

  // Gather pane divs.
  mk.CANVAS_CTRL.panes = document.querySelectorAll('#canvasControlPanes .canvas-control-pane');

}

function canvasControlBtnOnclick(e) {

  var btn = this;
  var op = btn.getAttribute('data-op');
  CANVAS_CTRL_OP = op;

  // Remove border from all buttons, then add a border to this button.
  removeHighlightFromControlButtons();
  btn.classList.add('active');
  btn.classList.add('btn-dark');

  if (game.isPaused()) {

    // The game is paused...

  }
  else {

    // They are playing the game...

    // Pause the game no matter what button is clicked, except for the grid toggle.
    if (op != 'toggleGrid') {
      getPlaybackButton('pause').click();
    }

  }

  // Update the control panes.
  var ctrl = mk.CANVAS_CTRL;
  ctrl.hidePanes();
  ctrl.showPane(CANVAS_CTRL_OP);

  // Invoke the button's click handler.
  switch (op) {
    case 'toggleGrid': gridButtonOnclick(this); break;
    case 'pointer': pointerButtonOnclick(this); break;
    case 'drawCircle': circleButtonOnclick(this, e); break;
    case 'drawRectangle': rectangleButtonOnclick(this, e); break;
    case 'drawPolygon': polygonButtonOnclick(this, e); break;
  }

}

function removeHighlightFromControlButtons() {
  var buttons = getCanvasButtons();
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('btn-dark');
  }
}



//function addDrawnShape(shapeName, id, shape) {
//  shape.id = id;
//  shape.type = shapeName;
//  game.addEntity(shape);
//}

function getDrawnShape(shapeName, id) {
  return game.getEntity(shapeName, id);
}

function removeDrawnShape(shapeName, id) {
  delete game.getEntities()[shapeName][id];
}
