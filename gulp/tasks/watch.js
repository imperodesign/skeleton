var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('../config');

gulp.task('watch', function () {
  gulp.watch(config.assetDirectory + '/styl/**/*.styl', ['css']);
});
