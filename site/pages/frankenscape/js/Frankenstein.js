class Frankenstein extends MkSprite {

  constructor(id, entity) {
    super(id, entity);
  }

  // BEHAVIORS

  // TODO, don't use "get" here, it doesn't follow along w/ the concept of a "class" here!
  // e.g. fall() {}
  get fall() {
    return {
      animated: true,
      do: function(entity, time) {

        // Reposition
        entity.y += entity.velocityY / game.getFps();

        // Recalculate velocity
        entity.velocityY =
          game.getGravity() *
          (entity.animationTimer.getElapsedTime()/1000) *
          game.getPixelsPerMeter();

        // Hit bottom?
        if (entity.y > (game.getCanvas().height - entity.height)) {
          entity.animationTimer.stop();
          entity.velocityY = 0;
        }

      }
    };
  }

}
