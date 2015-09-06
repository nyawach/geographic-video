var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    plugins = require('gulp-load-plugins')({ camelize: true });


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