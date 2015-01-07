var gulp = require('gulp');
var requireDir = require('require-dir');

// require individual tasks
requireDir('./gulp/tasks', { recurse: true });

// development task
gulp.task('develop', ['css', 'js', 'watch']);

// build task
gulp.task('build', ['css', 'js']);
