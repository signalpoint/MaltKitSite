function initPendulum() {

  // PENDULUM

  // TODO turn into Pendulum?
  myPendulum = new MkEntity('myPendulum', 'Pendulum', {
    x: canvas.width / 2,
    y: canvas.height / 10,
    pivotRadius: 7,
    weightX: canvas.width / 2, // x pos of the pendulum's weight
    weightY: canvas.height / 2, // y pos of the pendulum's weight
    weightRadius: 25,
    initialAngle: Math.PI/5,
    angle: Math.PI/5,
    rodLengthInPixels: 300
  //    ctx: {
  //    },
  });
  myPendulum.painter = {

    drawPivot: function(entity) {

      context.save();

      context.beginPath();
      context.shadowColor = undefined;
      context.fillStyle = 'white';
      context.arc(entity.x + entity.pivotRadius, entity.y, entity.pivotRadius / 2, 0, Math.PI*2, false);
      context.fill();
      context.stroke();

      context.beginPath();
      context.fillStyle = 'rgb(0,0,0,0.2)';
      context.arc(entity.x + entity.pivotRadius, entity.y, entity.pivotRadius, 0, Math.PI*2, false);
      context.fill();
      context.stroke();

      context.restore();

    },
    drawRod: function(entity) {

  //      context.save();

      context.beginPath();

      context.moveTo(

        entity.x +
        entity.pivotRadius +
        entity.pivotRadius*Math.sin(entity.angle),

        entity.y +
        entity.pivotRadius*Math.cos(entity.angle)

      );
      context.lineTo(

        entity.weightX -
        entity.weightRadius*Math.sin(entity.angle),

        entity.weightY -
        entity.weightRadius*Math.cos(entity.angle),

      );

  //      context.moveTo(0,0);
  //      context.lineTo(420, 420);

      context.stroke();

  //      context.restore();

    },
    drawWeight: function(entity) {

      context.save();

      context.beginPath();
      context.arc(entity.weightX, entity.weightY, entity.weightRadius, 0, Math.PI*2, false);
      context.clip();
      context.shadowColor = 'rgb(0,0,0)';
      context.shadowOffsetX = -4;
      context.shadowOffsetY = -4;
      context.shadowBlur = 8;
      context.lineWidth = 2;
      context.strokeStyle = 'rgb(100,100,195)';
      context.stroke();

      context.beginPath();
      context.arc(entity.weightX, entity.weightY, entity.weightRadius / 2, 0, Math.PI*2, false);
      context.clip();
      context.shadowColor = 'rgb(255,255,0)';
      context.shadowOffsetX = -4;
      context.shadowOffsetY = -4;
      context.shadowBlur = 8;
      context.stroke();

      context.restore();

    },

    paint: function(entity) {
      this.drawPivot(entity);
      this.drawRod(entity);
      this.drawWeight(entity);
      weightXBadge.innerHTML = Math.round(entity.weightX);
      weightYBadge.innerHTML = Math.round(entity.weightY);
      pendulumAngleBadge.innerHTML = parseFloat(entity.angle).toFixed(3);
    }

  };
  const pendulum = myPendulum.path2D();
  myPendulum.addBehavior({

    animated: 1,
    rodLength: 0.8, // 0.8ft

    do: function(entity, time) {

      if (!this.animationTimer.isRunning()) {
        this.animationTimer.start();
      }

      entity.angle = entity.initialAngle*Math.cos(
        Math.sqrt(game.getGravity()/this.rodLength)* (this.animationTimer.getElapsedTime() / 1000)
      );
      entity.weightX = entity.x + Math.sin(entity.angle)*entity.rodLengthInPixels;
      entity.weightY = entity.y + Math.cos(entity.angle)*entity.rodLengthInPixels;

    }

  });

}