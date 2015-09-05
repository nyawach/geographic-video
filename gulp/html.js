var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    plugins = require('gulp-load-plugins')({ camelize: true });

gulp.task('html', function () {
    gulp.src('src/**/*.html')
		.pipe(plugins.plumber())
        .pipe(plugins.changed('www/'))
        .pipe(gulp.dest('www/'))
        // .pipe(plugins.w3cjs())
		.pipe(browserSync.reload());
});