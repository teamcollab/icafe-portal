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

  console.log("post.id = " + newPost.id + " created");
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

  post.content = post.content.replace(/↵/g, "\n")



  if(this.request.query["format"] === "md"){
    console.log("post.content", post.content);
    post.content = marked(post.content);

  }
  this.body = post

};
