var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('../config');

gulp.task('css', function () {
  return gulp.src(config.index.styl)
    .pipe(plugins.stylus())
    .pipe(plugins.autoprefixer())
    .pipe(plugins.csso())
    .pipe(gulp.dest(config.dir.dist));
});
