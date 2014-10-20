var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('../config');

gulp.task('watch', function () {
  plugins.watch(config.assetDirectory + '/styl/**/*.styl', function () {
    gulp.start('css');
  });
});
