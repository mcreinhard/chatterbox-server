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
  filter = _.identity
  sort = _.identity
    
  if options?.filter?
    [key, val] = [k, v] for k, v of options.filter
    if key?
      filter = (list) -> _(list).filter ((x) -> x[key] is val)
    
  if options?.order?
    sort = 
      if options.order[0] is '-'
        (list) -> do (_(list).sortBy options.order[1..]).reverse
      else
        (list) -> _(list).sortBy options.order

  filter sort data

module.exports = messages
