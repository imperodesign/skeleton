var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');

gulp.task('stylus', function () {
  return gulp.src('app/assets/styl/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('app/assets/css'));
})

// TASKS
gulp.task('build', ['stylus'])

gulp.task('watch', ['build'], function () {
  gulp.watch('app/assets/styl/**/*.styl', ['stylus'])
})
