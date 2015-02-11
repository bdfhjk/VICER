module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    copy: {
      main: {
        files: [
          // includes files within path and its sub-directories
          {expand: true, src: ['assets/**'], dest: 'dist/'},

          // includes files within path and its sub-directories
          {expand: true, flatten: true, src: ['server/**'], dest: 'dist/'},
          // includes files within path and its sub-directories
          {expand: true, src: ['src/**'], dest: 'dist/'},
        ],
      },
    },

    express: {
      options: {
        background: false,
      },
      dev: {
        options: {
          script: 'dist/app.js'
        }
      }
    },

    clean: ["dist"]
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('test', ['jshint', 'mochaTest']);

  grunt.registerTask('default', ['jshint', 'copy', 'express']);

};
