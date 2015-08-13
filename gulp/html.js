var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({ camelize: true });

gulp.task('html', function () {
    gulp.src('html/*.html')
		.pipe(plugins.plumber())
        .pipe(plugins.changed('www/'))
        .pipe(gulp.dest('www/'))
        // .pipe(plugins.w3cjs())
		.pipe(plugins.connect.reload());
});