var gulp = require('gulp');

gulp.task('watch', function() {
    gulp.watch(['./src/**/*.html'], ['html']);
    // gulp.watch(['./scss/**/*.scss'], ['sass']);
    gulp.watch(['./src/**/*.js'], ['js']);
});

