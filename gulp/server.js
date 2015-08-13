var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({ camelize: true });

gulp.task('server', function(){
  plugins.connect.server({
    root: ['www'],
    port: 9000,
    livereload: true,
    middleware: function(connect, o) {
      return [ (function() {
          var url = require('url');
          var proxy = require('proxy-middleware');
          var options = url.parse('http://beta.rhinobird.tv/api');
          options.route = '/api';
          return proxy(options);
      })() ];
    }
  });
});