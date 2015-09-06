var gulp = require('gulp');

gulp.task('watch', function() {
    gulp.watch(['./src/**/*.html'], ['html']);
    gulp.watch(['./src/scss/**/*.scss'], ['sass']);
    gulp.watch(['./src/**/*.js'], ['js']);
});

