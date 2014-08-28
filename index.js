var path = require('path')
  , map = require('map-stream')
  , config = require('./lib/config')
  , js = require('./lib/js');

function make(file, fn) {
  var extname = path.extname(file.path);

  switch (extname) {
    case '.js':
      return js(file, fn);
    case '.css':
    case '.html':
      // ignore
      return fn(file);
  }
}

module.exports = function (opts) {
  config.set(opts);

  var stream = map(function (file, fn) {
    if (file.isNull()) {
      return fn(file);
    }

    if (file.isBuffer()) {
      return make(file, fn);
    }

    if (file.isStream()) {
      this.emit('error', new Error('Streams are not supported!'));
      return fn(file);
    }
  });
  return stream;
}