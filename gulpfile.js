var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

gulp.task('dist', function () {
  return gulp.src('dev/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

gulp.task('spec', function () {
  var bundler = watchify(browserify('./spec/spec.js', watchify.args));

  bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('../spec/specBundle.js'))
    .pipe(gulp.dest('./spec'));
});

gulp.task("watch", function () {
  gulp.start('dist', 'spec');
  gulp.watch('dev/**/*.js', ["dist"]);
  gulp.watch('spec/**/*.js', ["spec"]);
});

gulp.task("build", ["dist"]);

gulp.task("default", ["watch"]);
