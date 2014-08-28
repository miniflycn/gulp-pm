var _opts = {};

module.exports = {
  set: function (opts) {
    _opts = opts;
  },
  get: function () {
    return _opts;
  }
};