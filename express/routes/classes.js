// Generated by CoffeeScript 1.7.1
(function() {
  var defaultCorsHeaders, express, messages, router;

  express = require('express');

  messages = require('../data/messages');

  router = express.Router();

  router.route('/messages').all(function(req, res, next) {
    res.set(defaultCorsHeaders);
    return next();
  }).get(function(req, res, next) {
    console.log(req.query);
    return res.status(200).json({
      results: messages.get(req.query)
    });
  }).post(function(req, res, next) {
    console.log(req.body);
    messages.add(req.body);
    return res.status(201);
  });

  module.exports = router;

  defaultCorsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10
  };

}).call(this);