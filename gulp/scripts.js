var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({ camelize: true });

gulp.task('js', function () {
    gulp.src(['ng/module.js', 'ng/**/*.js'])
		.pipe(plugins.plumber())
		// ↓concatで更新されたのしか出力されなさそう...
		// .pipe(plugins.changed(path.jsDest))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.uglify({mangle: false}))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('www/js'))
		.pipe(plugins.connect.reload());
});