var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    plugins = require('gulp-load-plugins')({ camelize: true });

gulp.task('js', function () {
    gulp.src(['src/js/module.js', 'src/**/*.js'])
		.pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.uglify({mangle: false}))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('www/js'))
		.pipe(browserSync.reload());
});