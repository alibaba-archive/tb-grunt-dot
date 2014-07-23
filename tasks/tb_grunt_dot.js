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

    var options = this.options({
      ext: '.html',
      amd: true
    });

    this.files.forEach(function(f) {
      var files = f.src.filter(function(srcFilePath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (grunt.file.isDir(srcFilePath)) return false;
        if (!grunt.file.exists(srcFilePath)) {
          grunt.log.warn('Source file "' + srcFilePath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      if (!files.length) return;

      var originalContent = files.map(function(srcFilePath) {
        return grunt.file.read(srcFilePath);
      }).join('');

      var destFilePath = f.dest.replace(options.ext, '.js')

      try {
        originalContent = doT.template(originalContent).toString();
        // make template amd ready
        if (options.amd) {
          originalContent = 'define([],function(){return ' + originalContent + '});';
        }
        grunt.file.write(destFilePath, originalContent);
      } catch (e) {
        grunt.log.error('Source file "' + f.src + '" error.', e);
      }

    });
  });

};