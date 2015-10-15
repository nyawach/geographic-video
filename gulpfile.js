var gulp = require('gulp'),
	browserSync = require('browser-sync'),
    plugins = require('gulp-load-plugins')({ camelize: true });



gulp.task('html', function () {
    gulp.src('src/**/*.html')
		.pipe(plugins.plumber())
        .pipe(plugins.changed('www/'))
        .pipe(gulp.dest('www/'))
		.pipe(browserSync.reload());
});


/* Sass(SCSS)ビルド */
gulp.task('sass', function() {
    gulp.src('./src/scss/**/*.scss')
        .pipe(plugins.plumber())
        // 差分ファイルのみ次のストリームに流す
        .pipe(plugins.changed('./src/scss/**/.scss'))
        // Compile .scss file
        .pipe(plugins.sass())
        // autoprefixer, media-query packer, altenative rem font-size, etc.
        .pipe(plugins.pleeease({
            autoprefixer: ['last 5 versions'],
            minifier: true,
            mqpacker: true,
            rem: true
        }))
        // Combine css properties
        .pipe(plugins.csscomb())
        .pipe(gulp.dest('./www/css/'))
        // Minify
        .pipe(plugins.cssmin())
        // Output .css file
        .pipe(plugins.rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
        // Linter
        // .pipe(plugins.csslint("csslintrc.json"))
        // .pipe(plugins.csslint.reporter())
        // Reload browser
        .pipe(browserSync.reload());
});

/* Style Stats でCSSの評価 */
gulp.task('stats', function(){
    gulp.src('./www/css/*.css')
        .pipe(plugins.stylestats());
});



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


gulp.task('reload', function(){
  browserSync.reload();
});

gulp.task('watch', function() {
    gulp.watch(['./src/**/*.html'], ['html']);
    gulp.watch(['./src/scss/**/*.scss'], ['sass']);
    gulp.watch(['./src/**/*.js'], ['js']);
});

gulp.task('server', function(){
  browserSync({
    server: {
      baseDir: 'www'
    }
  });
});

gulp.task('default', ['watch', 'server']);
