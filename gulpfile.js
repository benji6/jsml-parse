var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('spec', function () {
  var bundler = watchify(browserify('./spec/lib/spec.js', watchify.args));

  bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('../spec/specBundle.js'))
    .pipe(gulp.dest('./spec'));
});

gulp.task('examples', function () {
  var bundler = watchify(browserify('./examples/main.js', watchify.args));

  bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('./examplesBundle.js'))
    .pipe(gulp.dest('./examples'));
});

gulp.task("watch", function () {
  gulp.start('spec');
  gulp.start('examples');
  gulp.watch('spec/**/*.js', ["spec"]);
  gulp.watch('examples/**/*.js', ["examples"]);
});

gulp.task("default", ["watch"]);
