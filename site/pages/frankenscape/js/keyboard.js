mk.CanvasGame.prototype.initKeyboard = function() {

  console.log('init keyboard');

  // KEYBOARD CONTROLS

  // Keys we care about (for now).
  var keyCodes = [
    87, // W
    65, // A
    83, // S
    68, // D
    32, // SPACEBAR
  ];

  // KEY DOWN
  window.addEventListener("keydown", function (event) {

    var keyCode = event.keyCode;
    if (keyCodes.includes(keyCode)) {

      event.preventDefault();

      if (keysDown[keyCode]) {

        // The key is already pressed....

        console.log('prevented key down: ' + keyCode);

        return;

      }

      // Track the time the key code was pressed and push it onto the stack.
      keysDown[keyCode] = {
        time: +new Date(),
      };
      keysDownStack.push(keyCode);

      if (game.isPaused()) { return; }

      switch (keyCode) {

        case 87: // W
          //myFrankenstein.moveUp(1);
          break;

        case 65: // A
          myFrankenstein.animate('walkLeft');
          myFrankenstein.moveLeft(3);
          break;

        case 83: // S
          //myFrankenstein.moveDown(5);
          break;

        case 68: // D

//          myFrankenstein.animate('walkRight');
//          myFrankenstein.moveRight(3);

          if (!myFrankenstein.behaviors[0].animationTimer.isRunning()) {

            myFrankenstein.vX = 20;

            myFrankenstein.behaviors[0].animationTimer.duration = 2000;

            var timeWarp = null;
            switch (timeWarpSelect.value) {

              case 'linear':
              case 'easeInOut':
                timeWarp = AnimationTimer[timeWarpSelect.value]();
                break;

              case 'easeIn':
              case 'easeOut':
                timeWarp = AnimationTimer[timeWarpSelect.value](timeWarpStrength.value);
                break;

              case 'elastic':
                timeWarp = AnimationTimer[timeWarpSelect.value](timeWarpPasses.value);
                break;

              case 'bounce':
                timeWarp = AnimationTimer[timeWarpSelect.value](timeWarpBounces.value);
                break;

            }

            myFrankenstein.behaviors[0].animationTimer.timeWarp = timeWarp;
            myFrankenstein.animate('walkRight');
            myFrankenstein.behaviors[0].animationTimer.start();

          }
          else {

            myFrankenstein.behaviors[0].animationTimer.reset();

          }

          break;

        case 32: // SPACEBAR
//          myFrankenstein.animate('crouch');
          break;

      }
    }
  }
  , false);

  // KEY UP
  window.addEventListener("keyup", function (event) {

    var keyCode = event.keyCode;
    if (keyCodes.includes(keyCode)) {

      event.preventDefault();

      delete keysDown[keyCode];
      var index = keysDownStack.indexOf(keyCode);
      if (index !== -1) { keysDownStack.splice(index, 1); }

      if (game.isPaused()) { return; }

      switch (keyCode) {

        case 87: // W
          break;

        case 65: // A
          myFrankenstein.animate('faceLeft');
          break;

        case 83: // S
          break;

        case 68: // D
//          myFrankenstein.animate('faceRight');
          break;

        case 32: // SPACEBAR
//          myFrankenstein.animate('jump');
          myFrankenstein.moveUp(myFrankenstein.height / 2);
          myFrankenstein.addBehavior(myFrankenstein.fall);
          break;

      }
    }
  }, false);

};
