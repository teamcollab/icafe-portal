'use strict';
var root = require('path').normalize(__dirname + '/..');

module.exports = {
  paths: {
    'in': {
      scss: root + '/src/client/scss/*.scss',
      jsx: root + '/src/client/**/*.jsx',
      js: root + '/src/client/**/*.js',
      app: root + '/build/app',
      bower_js: [
        root + 'bower_components/jquery/dist/jquery.js',
        root + 'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix.js',
        root + 'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert.js',
        root + 'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button.js',
        root + 'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/carousel.js',
        root + 'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js',
        root + 'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js',
        root + 'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab.js',
        root + 'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js',
        root + 'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy.js',
        root + 'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal.js',
        root + 'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js',
        root + 'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover.js'
      ],
      fonts: root + '/bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*'






    },
    out: {
      build_js: root + '/build',
      public: root + '/public',
      fonts: root + '/public/fonts',
    },
    toWatch: [root + '/src/**/*.js', root + '/config/*.js', root + '/server.js', root + '/lib/*.js']
  }
};
