var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('reload', function(){
  browserSync.reload();
});

