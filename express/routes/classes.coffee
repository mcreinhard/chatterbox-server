_ = require 'underscore'
express = require 'express'
messages = require '../data/messages'

router = express.Router()

router.route '/messages'
.all (req, res, next) ->
  res.set defaultCorsHeaders
  do next
.get (req, res, next) ->
  res.status 200
  .json
    results: messages.get req.query
.post (req, res, next) ->
  messages.add req.body
  res.send 201

router.route '/:roomname'
.all (req, res, next) ->
  res.set defaultCorsHeaders
  do next
.get (req, res, next) ->
  res.status 200
  .json
    results: messages.get _(req.query).extend
      filter: {roomname: req.param 'roomname'}
.post (req, res, next) ->
  messages.add _(req.body).extend roomname: req.param 'roomname'
  res.send 201

module.exports = router

defaultCorsHeaders =
  "access-control-allow-origin": "*"
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS"
  "access-control-allow-headers": "content-type, accept"
  "access-control-max-age": 10 # Seconds.

