//'use strict'; // cannot use 'use strict' with yield
var mongoose = require('mongoose');
// var Post = mongoose.model('Post');
var marked = require('marked');
var _ = require('underscore');

var db = require(appRoot+'/db');
var Post = db.sequelize.Post;

exports.index = function *() {

  var posts = yield Post.findAll({
    limit: 3,
    order: 'id DESC'
  });
  this.body = {
    posts: posts
  };

};


exports.create = function *() {

  var newPost = yield Post.create(this.request.body);

  console.log("post._id = " + newPost._id + " created");
  this.body = newPost;

};

exports.update = function *() {

  var post = yield Post.find(this.params.id);
  var editedPost = this.request.body

  post = _.extend(post, editedPost)

  this.body = yield post.save()

};


exports.delete = function *() {

  var post = yield Post.find(this.params.id);
  this.body = yield post.destroy()

};


exports.show = function *() {

  var post = yield Post.find(this.params.id);

  if(this.request.query["format"] === "md"){
    post.content = marked(post.content.replace(/↵/g, "\n"));

  }
  this.body = post

};
