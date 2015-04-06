module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Lint Spaces in code
    lintspaces: {
      all: {
        src: [
          '*.html',
          'less/**/*.less',
          '*.js',
          'js/**/*.js'
        ],
        options: {
          newline: true,
          newlineMaximum: 2,
          trailingspaces: true,
          indentationGuess: false,
          editorconfig: '.editorconfig',
          ignores: [
            'html-comments',
            'js-comments'
          ],
          showTypes: true,
          showCodes: true
        }
      }
    },

    less: {
      style: {
        files: {
          'css/style.css': ['less/style.less']
        }
      }
    },

    concat: {
      dist: {
        src: ['node_modules/tap.js/dist/tap.min.js', 'js/map.js', 'js/menu.js'],
        dest: 'js/script.js',
      },
    },

    watch: {
      options: {
        livereload: true,
        spawn:false
      },
      style: {
        files: ['less/**/*.less'],
        tasks: ['less'],
      },
      html: {
        files: ['*.html'],
      },
      js: {
        files: ['js/*.js'],
        tasks: ['concat'],
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({ browsers: ['last 2 version'] }).postcss
        ]
      },
      dist: { src: 'css/style.css' }
    },

    csswring: {
      options: {
        map: true
      },
      main: {
        dest: 'css/style.min.css',
        src: ['css/style.css']
      }
    }

  });

  grunt.loadNpmTasks('grunt-lintspaces');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('csswring');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('lint', ['lintspaces']);
  grunt.registerTask('build:development', [ 'less', 'postcss', 'concat' ]);
  grunt.registerTask('build', [ 'build:development' ]);
  grunt.registerTask('default', [ 'build:development', 'watch' ]);
  grunt.registerTask('build:production', [ 'less', 'postcss', 'csswring', 'concat' ]);

};
