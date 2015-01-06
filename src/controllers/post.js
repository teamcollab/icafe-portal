//'use strict'; // cannot use 'use strict' with yield
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var marked = require('marked');
var _ = require('underscore');


exports.index = function *() {

  var posts = yield Post.find().sort({'updated': -1}).limit(3).exec();
  this.body = {
    posts: posts
  };

};


exports.create = function *() {

  var post = new Post(this.request.body);

  var newPost = yield post.save();

  console.log("post._id = " + newPost._id + " created");
  this.body = newPost;

};

exports.update = function *() {

  var post = yield Post.findById(this.params.id).exec();
  var editedPost = this.request.body

  post = _.extend(post, editedPost)

  this.body = yield post.save()

};


exports.show = function *() {

  var post = yield Post.findById(this.params.id).exec();

  if(this.request.query["format"] === "md"){
    post.content = marked(post.content.replace(/↵/g, "\n"));

  }
  this.body = post

};
