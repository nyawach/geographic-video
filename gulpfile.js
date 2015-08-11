var gulp = require('gulp'),
    fs = require('fs');

fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
  require('./gulp/' + task)
});

gulp.task('default', ['css', 'js']);