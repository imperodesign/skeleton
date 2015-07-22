const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()

gulp.task('watch', function () {
  gulp.watch(`${process.env.STATIC_DIR}/src/styl/**/*.styl`, ['css'])
  gulp.watch(`${process.env.STATIC_DIR}/src/js/**/*.js`, ['js'])
})
