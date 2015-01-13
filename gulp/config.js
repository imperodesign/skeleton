var config = {};

// directories
config.dir = {
  assets: './app/assets',
  dist: './app/assets/dist',
  styl: './app/assets/src/styl',
  js: './app/assets/src/js'
};

// index files
config.index = {
  js: config.dir.js + '/index.js',
  styl: config.dir.styl + '/index.styl'
};

module.exports = config;
