
request = require('superagent');

errorHandle = (error, res) ->
  console.log "error", error
  console.log "error res", res

  console.log error

module.exports.get = (url, cb) ->
  request.get(url)
  .set('Content-Type', 'application/json')
  .on('error', errorHandle)
  .end(cb);

module.exports.post = (url, params, cb) ->
  request.post(url)
  .send(params)
  .on('error', errorHandle)
  .set('Content-Type', 'application/json')
  .end(cb);
