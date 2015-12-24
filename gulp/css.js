const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()

const DEVELOPMENT = (process.env.NODE_ENV === 'development')

gulp.task('css', function () {
  return gulp.src(`${process.env.STATIC_DIR}/src/styl/index.styl`)
    .pipe(plugins.sourdough())
    .pipe(plugins.if(!DEVELOPMENT, plugins.csso()))
    .pipe(gulp.dest(`${process.env.STATIC_DIR}/dist`))
})
