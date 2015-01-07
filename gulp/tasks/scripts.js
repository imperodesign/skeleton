var config = require('../config');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('js', function () {
  return browserify(config.index.js)
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(plugins.uglify())
    .pipe(gulp.dest(config.dir.dist));
});
