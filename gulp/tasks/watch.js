var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('../config');

gulp.task('watch', function () {
  gulp.watch(config.dir.styl + '/**/*.styl', ['css']);
  gulp.watch(config.dir.js + '/**/*.js', ['js-dev']);
});
