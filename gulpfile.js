var gulp = require('gulp'),
	browserSync = require('browser-sync'),
    plugins = require('gulp-load-plugins')({ camelize: true }),
    fs = require('fs');

fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
  require('./gulp/' + task);
});

gulp.task('default', ['watch', 'server']);
