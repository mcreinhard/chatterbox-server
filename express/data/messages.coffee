_ = require 'underscore'

messages = {}

data = [{
  username: 'me'
  text: 'foo'
  roomname: 'room'
  createdAt: '2014-05-06T18:55:59.131Z'
}]

messages.add = (message) ->
  (message[key] ?= '') for key in ['username', 'text', 'roomname']
  message.createdAt = do (new Date()).toJSON
  data.push message

messages.get = (options) ->
  if options?.order?.length > 0
    if options.order[0] is '-'
      do (_(data).sortBy options.order.slice(1)).reverse
    else
      _(data).sortBy options.order
  else data

module.exports = messages
