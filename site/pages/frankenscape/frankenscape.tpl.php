<div class="container">

  <div class="row">

    <div class="col-12 col-md-7">

      <div class="mb-1">
        <canvas id="myCanvas" width="640" height="480" style="border:1px solid #000000;"></canvas>
      </div>

      <!-- PLAYBACK CONTROLS -->
      <div id="playbackControls" class="btn-group" role="group" aria-label="Playback controls">

        <!-- PLAY -->
        <button type="button" class="btn btn-light" data-op="play" title="Play" disabled>
          <i class="fas fa-play"></i>
        </button>

        <!-- PAUSE -->
        <button type="button" class="btn btn-light" data-op="pause" title="Pause">
          <i class="fas fa-pause"></i>
        </button>

      </div>

    </div>
    <div class="col-12 col-md-5">

      <div class="row">

        <div class="col-2">

          <!-- CANVAS CONTROLS -->
          <div id="canvasControls" class="btn-group btn-group-vertical" role="group" aria-label="Canvas controls">

            <!-- GRID -->
            <button type="button" class="btn btn-light" data-op="toggleGrid" title="Toggle Grid">
              <i class="fas fa-border-all"></i>
            </button>

            <!-- CIRCLE -->
            <button type="button" class="btn btn-light" data-op="drawCircle" title="Draw Circle">
              <i class="far fa-circle"></i>
            </button>

            <!-- RECTANGLE -->
            <button type="button" class="btn btn-light" data-op="drawRectangle" title="Draw Rectangle / Square">
              <i class="far fa-square"></i>
            </button>

            <!-- DRAW POLYGON -->
            <button type="button" class="btn btn-light" data-op="drawPolygon" title="Draw Polygon">
              <i class="fas fa-draw-polygon"></i>
            </button>

          </div>

        </div>

        <div class="col-10">

          <h3>Frankenstein</h3>
          <ul class="list-group mb-3">
            <li class="list-group-item">Coordinates<span class="badge bg-success float-end" id="frankensteinCoordinatesBadge"></span></li>
            <li class="list-group-item">
              Time Warp
              <select class="form-select form-select-sm float-end mb-1" id="timeWarpSelect" onchange="timeWarpSelectOnchange(this)">
                <option value="linear">Linear</option>
                <option value="easeIn">Ease in</option>
                <option value="easeOut">Ease out</option>
                <option value="easeInOut">Ease in/out</option>
                <option value="elastic">Elastic</option>
                <option value="bounce">Bounce</option>
              </select>
              <div class="mb-1">
                <label for="timeWarpStrength" class="form-label">Strength</label>
                <input type="number" class="form-control" id="timeWarpStrength" value="1" disabled>
              </div>
              <div class="mb-1">
                <label for="timeWarpPasses" class="form-label">Passes</label>
                <input type="number" class="form-control" id="timeWarpPasses" value="5" disabled>
              </div>
              <div class="mb-1">
                <label for="timeWarpBounces" class="form-label">Bounces</label>
                <input type="number" class="form-control" id="timeWarpBounces" value="5" disabled>
              </div>
            </li>
          </ul>

          <h3>Rock</h3>
          <ul class="list-group mb-3">
            <li class="list-group-item">Coordinates<span class="badge bg-success float-end" id="coordinatesBadge"></span></li>
            <li class="list-group-item">Angle<span class="badge bg-secondary float-end" id="angleBadge"></span></li>
            <li class="list-group-item">Velocity<span class="badge bg-primary float-end" id="velocityBadge"></span></li>
          </ul>

          <h3>Pendulum</h3>
          <ul class="list-group">
            <li class="list-group-item">weightX<span class="badge bg-success float-end" id="weightXBadge"></span></li>
            <li class="list-group-item">weightY<span class="badge bg-secondary float-end" id="weightYBadge"></span></li>
            <li class="list-group-item">angle<span class="badge bg-primary float-end" id="pendulumAngleBadge"></span></li>
          </ul>

        </div>

      </div>

    </div>

  </div>

</div>
