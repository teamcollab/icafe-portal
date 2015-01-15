
request = require('superagent');



module.exports.get = (url, cb) ->
  request.get(url)
  .set('Accept', 'application/json')
  .set('Content-Type', 'application/json')
  .end(cb);

module.exports.post = (url, params, cb) ->
  request.post(url)
  .send(params)
  .set('Accept', 'application/json')
  .set('Content-Type', 'application/json')
  .end(cb);

module.exports.put = (url, params, cb) ->
  request.put(url)
  .send(params)
  .set('Accept', 'application/json')
  .set('Content-Type', 'application/json')
  .end(cb);

module.exports.del = (url, cb) ->
  request.del(url)
  .set('Accept', 'application/json')
  .set('Content-Type', 'application/json')
  .end(cb);

module.exports.upload = (url, file, cb) ->
  console.log "file", file
  request
  .post('/file')
  .attach('file', file, file.name)
  .end(cb);
