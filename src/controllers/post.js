//'use strict'; // cannot use 'use strict' with yield
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

exports.create = function *() {
  var post = new Post(this.request.body);

  try {
    this.body = yield post.save();
  } catch (error) {
    console.log("error", error);
  }

};

exports.show = function *() {

  try {
    var post = yield Post.findById(this.params.id).exec();
    this.body = post
  } catch (error) {
    console.log("error", error);
  }

};
