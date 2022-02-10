var makeBinary = true;

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');

var jsSrc = [

  './js/Frankenstein.js',
  './js/Rock.js',
  './js/Pendulum.js',
  './js/Dog.js',

  './js/frankenscape.js',
  './js/mouse.js',
  './js/keyboard.js',

  './js/canvas-controls.js',
  './js/controls/grid.js',

];

// Minify JavaScript
function minifyJs() {
  console.log('compressing frankenscape.js...');
  var js = gulp.src(jsSrc)
    .pipe(gp_concat('frankenscape.js'))
    .pipe(gulp.dest('./'));
//  if (makeBinary) {
//    console.log('compressing frankenscape.min.js...');
//    return js.pipe(gp_rename('frankenscape.min.js'))
//    .pipe(gp_uglify())
//    .pipe(gulp.dest('./'));
//  }
  return js;
}
gulp.task(minifyJs);

gulp.task('default', function(done) {

  gulp.watch(jsSrc, gulp.series('minifyJs'));

  done();

});
