# tb.grunt-dot

> An dot builder to be used under grunt.

### Overview
In your project's Gruntfile, add a section named `tb_grunt_dot` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  tb_grunt_dot: {
    options: {
      ext: '.html',
      amd: true
    },
    build: {
      expand: true,
      cwd: 'build/temp',
      src: ['**/*.html', '!**/bower_components'],
      dest: 'build/temp'
    }
  },
});
```

### Options
