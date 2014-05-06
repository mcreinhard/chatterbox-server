_ = require 'underscore'

messages = {}

data = [{
  username: 'me'
  text: 'foo'
  roomname: 'room'
  createdAt: '2014-05-06T18:55:59.131Z'
}]

messages.add = (message) ->
  console.log message
  (message[key] ?= '') for key in ['username', 'text', 'roomname']
  message.createdAt = do (new Date()).toJSON
  data.push message

messages.get = (options) ->
  console.log options
  if options?.filter?
    [key, val] = options.filter
    filter = (list) -> _(list).filter ((x) -> x[key] is val)
  else filter = _.identity
    
  if options?.order?
    if options.order[0] is '-'
      sort = (list) -> do (_(list).sortBy options.order.slice(1)).reverse
    else
      sort = (list) -> _(list).sortBy options.order
  else sort = _.identity

  filter sort data

module.exports = messages
