var CANVAS_PLAYBACK_OP = null; // play, pause

function getPlaybackButtons() {
  return document.querySelectorAll('#playbackControls button');
}
function getPlaybackButton(op) {
  return document.querySelector('#playbackControls button[data-op="' + op + '"]');
}
function getPlaybackActiveButton() {
  return document.querySelectorAll('#playbackControls button.active');
}

function initPlaybackControls() {

  // Add click listeners to buttons.
  var buttons = getPlaybackButtons();
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', playbackBtnOnclick, true);
  }



  // Handle hover for play/pause button.
//  var btn = getPlaybackButtons('togglePlay');
//  var showPlay = function(btn) {
//    var i = btn.querySelector('svg');
//    i.classList.remove('fa-pause');
//    i.classList.add('fa-play');
//    btn.setAttribute('title', 'Play');
//    btn.setAttribute('data-action', 'play');
//  };
//  var showPause = function(btn) {
//    var i = btn.querySelector('svg');
//    i.classList.remove('fa-play');
//    i.classList.add('fa-pause');
//    btn.setAttribute('title', 'Pause');
//    btn.setAttribute('data-action', 'pause');
//  };
//  btn.addEventListener('mouseover', function(e) {
//    game.isPaused() ? showPlay(this) : showPause(this);
//  });
//  btn.addEventListener('mouseout', function(e) {
//    game.isPaused() ? showPause(this) : showPlay(this);
//  });

}

function playbackBtnOnclick(e) {

  var btn = this;
  var op = btn.getAttribute('data-op');
  CANVAS_PLAYBACK_OP = op;

  // Remove border from all buttons, then add a border to this button.
  removeHighlightFromPlaybackButtons();
  btn.classList.add('active');
  btn.classList.add('btn-dark');

  if (game.isPaused()) {

    // The game is paused...

  }
  else {

    // They are playing the game...

  }

  switch (op) {

    case 'play':
      playButtonOnclick(this);
      break;

    case 'pause':
      pauseButtonOnclick(this);
      break;

  }

}

function removeHighlightFromPlaybackButtons() {
  var buttons = getPlaybackButtons();
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('btn-dark');
  }
}

function playButtonOnclick(btn) {
  game.togglePause();
  btn.disabled = true;
  getPlaybackButton('pause').disabled = false;
}

function pauseButtonOnclick(btn) {
  game.togglePause();
  btn.disabled = true;
  getPlaybackButton('play').disabled = false;
}
