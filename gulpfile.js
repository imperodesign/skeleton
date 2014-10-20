var gulp = require('gulp');
var requireDir = require('require-dir');

// require individual tasks
requireDir('./gulp/tasks', { recursive: true });

// development task
gulp.task('develop', ['css'], function () {
  gulp.start('watch');
});

// build task
//gulp.task('watch', ['build'], function () {
//  gulp.watch('app/assets/styl/**/*.styl', ['stylus'])
//})
