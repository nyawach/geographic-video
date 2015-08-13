var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({ camelize: true });


/* Sass(SCSS)ビルド */
gulp.task('sass', function() {
    gulp.src('./scss/ionic.app.scss')
        .pipe(plugins.plumber())
        // 差分ファイルのみ次のストリームに流す
        .pipe(plugins.changed('./scss/**/.scss'))
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
        .pipe(plugins.connect.reload());
});

/* Style Stats でCSSの評価 */
gulp.task('stats', function(){
    gulp.src('./www/css/ionic.app.css')
        .pipe(plugins.stylestats());
});