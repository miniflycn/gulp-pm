var Package = require('duo-package')
  , eachAsync = require('each-async')
  , config = require('./config');

module.exports = function (file, fn) {
  var contents = file.contents.toString()
    , list = [];

  contents.replace(/require\((['"])(.+)\1\)/, function (all, quz, name) {
    if (name.indexOf(':') === 0) {
      name = name.slice(1);
      list.push(name);
    }
  });

  eachAsync(list, function (item, i, done) {
    item = item.split('@');
    new Package(item[0], item[1])
        .token(config.get().token)
        .directory('components')
        .fetch(function(err) {
          if (err) return done(err)
          done();
        })
  }, function (err) {
    if (err) return fn(err);
    fn(null, file);
  });

};