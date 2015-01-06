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

  before(function (done) {
    co(function *() {
      yield authHelper.createUser();
      authHelper.signAgent(request, done);
    })(done);
  });



  describe('create', function() {
    before(function (done) {
      authHelper.signAgent(request, done);
    });


    it('create success', function(done) {

      request.post('/post')
      .send({
        title: "hello",
        description: "haha",
        imagesrc: "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
        content: "# yoyo↵↵## YOYO"
      })
      .expect(200)
      .end(function(error, res) {
        console.log("error", error);

        (error == null).should.be.true

        var createPost = res.body
        createPost.should.have.properties("title", "description", "content", "imagesrc");

        done();
      });
    });
  });

  describe('update', function() {

    testPost = {}

    before(function (done) {
      authHelper.signAgent(request, done);

      co(function *() {

        var post = new Post({
          title: "hello update",
          description: "haha",
          imagesrc: "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
          content: "# yoyo↵↵## YOYO"
        });
        testPost = yield post.save()


      })(done);


    });


    it('update success', function(done) {

      request.put('/post/' + testPost._id)
      .send({
        title: "updated",
        description: "updated",
        imagesrc: "updated",
        content: "updated"
      })
      .expect(200)
      .end(function(error, res) {
        console.log("error", error);

        (error == null).should.be.true

        var updatedPost = res.body
        updatedPost.should.have.properties("title", "description", "content", "imagesrc");
        updatedPost._id.should.be.equal(testPost._id.toString())
        updatedPost.title.should.be.equal("updated")
        updatedPost.description.should.be.equal("updated")
        updatedPost.imagesrc.should.be.equal("updated")
        updatedPost.content.should.be.equal("updated")

        done();
      });
    });
  });



  describe('show', function() {

    testPost = {}

    before(function (done) {
      co(function *() {

        var post = new Post({
          title: "hello",
          description: "haha",
          imagesrc: "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
          content: "# yoyo↵↵## YOYO"
        });
        testPost = yield post.save()


      })(done);

    });

    it('json', function(done) {
      request.get('/post/'+testPost._id)
      .expect(200)
      .end(function(error, res) {
        (error == null).should.be.true
        var showPost = res.body
        showPost.should.have.properties("title", "description", "content", "imagesrc");



        done();
      });
    });
    it('markdown', function(done) {
      request.get('/post/'+testPost._id+"?format=md")
      .expect(200)
      .end(function(error, res) {
        (error == null).should.be.true
        var showPost = res.body
        showPost.should.have.properties("title", "description", "content", "imagesrc");
        showPost.content.should.startWith('<h1 ');

        showPost._id.should.be.equal(testPost._id.toString());


        done();
      });
    });


  });


  describe('index', function() {

    testPost = {}

    before(function (done) {
      co(function *() {

        var post1 = new Post({
          title: "data1",
          description: "haha",
          imagesrc: "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
          content: "# yoyo↵↵## YOYO"
        });

        yield post1.save()

        var post2 = new Post({
          title: "data2",
          description: "haha",
          imagesrc: "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
          content: "# yoyo↵↵## YOYO"
        });

        yield post2.save()

        var post3 = new Post({
          title: "data3",
          description: "haha",
          imagesrc: "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
          content: "# yoyo↵↵## YOYO"
        });

        yield post3.save()


      })(done);

    });


    it('markdown', function(done) {
      request.get('/post')
      .expect(200)
      .end(function(error, res) {
        (error == null).should.be.true
        var posts = res.body.posts
        posts.length.should.be.equal(3);

        posts[0].title.should.be.equal("data3");
        posts[1].title.should.be.equal("data2");
        posts[2].title.should.be.equal("data1");

        done();
      });



    });
  });


  after(function(done) {
    databaseHelper.dropDatabase(done);
  });
});
