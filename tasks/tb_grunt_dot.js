/*
 * tb.grunt-dot
 * https://code.teambition.com/project/grunt-dot
 *
 */

'use strict';

var doT = require('dot')

module.exports = function(grunt) {

  grunt.registerMultiTask('tb_grunt_dot', 'An dot builder to be used under grunt.', function() {
    // Merge task-specific and/or target-specific options with these defaults.

    var options = this.options();
    options.ext = options.ext || '.dot'

    this.files.forEach(function(f) {
      var files = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (grunt.file.isDir(filepath)) return false;
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      if (!files.length) return;
      files.map(function(filepath) {
        var originalContent = grunt.file.read(filepath);
        try {
          originalContent = doT.template(originalContent).toString();
          // make template amd ready
          if (options.amd) {
            originalContent = 'define([],function(){return ' + originalContent + '});';
          }
          filepath = filepath.replace(options.ext, '.js')
          grunt.file.write(filepath, originalContent);
        } catch (e) {
          grunt.log.error('Source file "' + filepath + '" error.', e);
        }
      });
    });
  });

};
