mk.gridShown = false;

mk.gridDraw = function() {

  var color = 'black';
  var stepX = canvas.width / 10;
  var stepY = canvas.height / 10;

  context.strokeStyle = color;
  context.lineWidth = 0.5;

  for (var i = stepX + 0.5; i < canvas.width; i += stepX) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, canvas.height);
    context.stroke();
  }

  for (var i = stepY + 0.5; i < canvas.height; i += stepY) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(canvas.width, i);
    context.stroke();
  }

};

function gridButtonOnclick(btn) {

  mk.gridShown = !mk.gridShown;

  if (mk.gridShown) {
    mk.gridDraw();
  }
  else {
    game.refreshCanvas();
  }

}
