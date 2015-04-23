module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    csslint: {
      strict: {
        options: {
          import: 2,
        },
        src: ['assets/styles/**/*.css']
      }
    },

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
          {expand: true, src: ['assets/**'], dest: 'dist/'},
          {expand: true, cwd: 'server/', src:['**'], dest: 'dist/'},
          {expand: true, src: ['src/**'], dest: 'dist/'},
          {expand: true, src: ['bower_components/**'], dest: 'dist/assets/'},
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

    execute: {
    	compileParser: {
    	    options: {
    		    args: ['dist/'],
    	    },
    	    src: ['src/backend/parser/Make.js']
    	}
    },

    "install-dependencies": {
      options: {
        cwd: 'dist'  
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-install-dependencies');
  grunt.loadNpmTasks('grunt-execute');

  // Enable after fixing #17
  //grunt.registerTask('lint', ['jshint', csslint]); 
  grunt.registerTask('lint', ['jshint']); 
  grunt.registerTask('test', ['lint', 'mochaTest']);
  grunt.registerTask('parser', ['execute:compileParser']);
  grunt.registerTask('make', ['lint', 'copy', 'parser']);
  grunt.registerTask('default', ['make', 'install-dependencies', 'express']);

};
