express = require 'express'
messages = require '../data/messages'
router = express.Router()

router.route '/messages'
.all (req, res, next) ->
  res.set defaultCorsHeaders
  do next
.get (req, res, next) ->
  console.log req.query
  res.status 200
  .json
    results: messages.get req.query
.post (req, res, next) ->
  console.log req.body
  messages.add req.body
  res.status 201

module.exports = router

defaultCorsHeaders =
  "access-control-allow-origin": "*"
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS"
  "access-control-allow-headers": "content-type, accept"
  "access-control-max-age": 10 # Seconds.

