
var parse = require('co-busboy');
var fs = require('fs');
var os = require('os');
var path = require('path');
var config = require(appRoot+'/config/config');


exports.save = function *(){

  // multipart upload
  var parts = parse(this);
  var part;

  var file = {}
  var filePath = config.app.file.path


  while (part = yield parts) {
    var stream = fs.createWriteStream(path.join(filePath+"/images", part.filename));
    part.pipe(stream);

    file.name = part.filename
    file.path = stream.path
    file.mine = part.mime

  }



  this.body = file;
}

exports.index = function *(){
  var filePath = config.app.file.path + "images";
  var files = yield fs.readdirSync(filePath);

  this.body = {
    files: files
  }

}
