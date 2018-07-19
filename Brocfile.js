var Funnel = require('broccoli-funnel');
var Concat = require('broccoli-concat');
var MergeTrees = require('broccoli-merge-trees');
var Babel = require('broccoli-babel-transpiler');

// root of our source files
var projectFiles = 'src';

/* get a new node of only '*.css' files in the 'src' directory */
var cssFiles = new Funnel(projectFiles, {
  include: ['**/*.css']
});

/* get a new node of only *.js files in the 'src' directory */
var jsFiles = new Funnel(projectFiles, {
  include: ['**/*.js']
});

/* get a new node of only *.html files in the 'src' directory */
var htmlFiles = new Funnel(projectFiles, {
  include: ['**/*.html']
});


module.exports = new MergeTrees([
  cssFiles,
  new Concat(
    new Babel(jsFiles, {
      browserPolyfill: true,
      presets: [
        ['env', {
          'targets': {
            'browsers': ['last 1 versions']
          },
          exclude: ['transform-es2015-classes']
        }]
      ]
    }),
    { outputFile: 'out.js' }
  ),
  htmlFiles
]);