var gulp = require('gulp');

gulp.task('watch', function() {
    gulp.watch(['./html/**/*.html'], ['html']);
    gulp.watch(['./scss/**/*.scss'], ['sass']);
    gulp.watch(['./ng/**/*.js'], ['js']);
});

