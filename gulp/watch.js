var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({ camelize: true });

gulp.task('watch', function() {
    gulp.watch(['./html/**/*.html'], ['html']);
    gulp.watch(['./scss/**/*.scss'], ['sass']);
    gulp.watch(['./ng/**/*.js'], ['js']);
});

