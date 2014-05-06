// Generated by CoffeeScript 1.7.1
(function() {
  var data, messages, _;

  _ = require('underscore');

  messages = {};

  data = [
    {
      username: 'me',
      text: 'foo',
      roomname: 'room',
      createdAt: '2014-05-06T18:55:59.131Z'
    }
  ];

  messages.add = function(message) {
    var key, _i, _len, _ref;
    _ref = ['username', 'text', 'roomname'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      if (message[key] == null) {
        message[key] = '';
      }
    }
    message.createdAt = (new Date()).toJSON();
    return data.push(message);
  };

  messages.get = function(options) {
    var _ref;
    if ((options != null ? (_ref = options.order) != null ? _ref.length : void 0 : void 0) > 0) {
      if (options.order[0] === '-') {
        return (_(data).sortBy(options.order.slice(1))).reverse();
      } else {
        return _(data).sortBy(options.order);
      }
    } else {
      return data;
    }
  };

  module.exports = messages;

}).call(this);
