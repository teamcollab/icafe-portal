var app, authHelper, co, databaseHelper, request, should;

should = require('should');
app = require('../server');
request = require('supertest').agent(app.listen());
databaseHelper = require('./middlewares/database');
authHelper = require('./middlewares/authenticator');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var co = require('co');

describe('Post', function() {
  it('create', function(done) {
    request.post('/post')
    .send({
      title: "hello",
      description: "haha",
      content: "# yoyo↵↵## YOYO"
    })
    .expect(200)
    .end(function(error, res) {
      (error == null).should.be.true

      var createPost = res.body
      createPost.should.have.properties("title", "description", "content");

      done();
    });
  });

  describe('show', function() {

    testPost = {}

    before(function (done) {
      co(function *() {

        var post = new Post({
          title: "hello",
          description: "haha",
          content: "# yoyo↵↵## YOYO"
        });
        testPost = yield post.save()


      })(done);

    });

    it('show', function(done) {
      request.get('/post/'+testPost._id)
      .expect(200)
      .end(function(error, res) {
        (error == null).should.be.true
        var showPost = res.body
        showPost.should.have.properties("title", "description", "content");



        done();
      });
    });
  });

  after(function(done) {
    databaseHelper.dropDatabase(done);
  });
});
