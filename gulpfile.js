require('dotenv').load()
const gulp = require('gulp')
const tasks = ['css', 'js']

// require individual tasks
require('require-dir')('./gulp', {
  recurse: true
})

gulp.task('develop', tasks.concat(['watch']))
gulp.task('build', tasks)
