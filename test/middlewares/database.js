var mongoose = require('mongoose');
var co = require('co');

var Models = [
  mongoose.model('User'),
  mongoose.model('Post')
];

exports.dropDatabase = function (cb) {
  co(function *() {
    yield Models.map(dropCollection);
  })(cb);
};

var dropCollection = function (Model) {
  return new Promise(function (resolve, reject) {
    Model.collection.remove(function (err) {
      if(err) return reject(err);
      resolve();
    });
  });
};
