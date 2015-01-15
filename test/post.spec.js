var app, authHelper, co, databaseHelper, request, should;

should = require('should');
app = require('../server');
request = require('supertest').agent(app.listen());
authHelper = require('./middlewares/authenticator');
var co = require('co');

var db = require(appRoot+'/db');
var Post = db.sequelize.Post;


describe('Post', function() {

  before(function (done) {

    app.start(function(){
      co(function *() {
        yield authHelper.createUser();
      })(done);

    })

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

        testPost = yield Post.create({
          title: "update test data",
          description: "haha",
          imagesrc: "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
          content: "# yoyo↵↵## YOYO"
        });

      })(done);

    });


    it('update success', function(done) {
      request.put('/post/' + testPost.id)
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
        updatedPost.id.should.be.equal(testPost.id)
        updatedPost.title.should.be.equal("updated")
        updatedPost.description.should.be.equal("updated")
        updatedPost.imagesrc.should.be.equal("updated")
        updatedPost.content.should.be.equal("updated")

        done();
      });
    });
  });


  describe('delete', function() {

    testPost = {}

    before(function (done) {
      authHelper.signAgent(request, done);

      co(function *() {

        testPost = yield Post.create({
          title: "delete test data",
          description: "haha",
          imagesrc: "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
          content: "# yoyo↵↵## YOYO"
        });

      })(done);

    });


    it('delete success', function(done) {

      request.delete('/post/' + testPost.id)
      .expect(200)
      .end(function(error, res) {
        (error == null).should.be.true
        done();

      });
    });
  });


  describe('show', function() {

    testPost = {}

    before(function (done) {
      authHelper.signAgent(request, done);

      co(function *() {

        testPost = yield Post.create({
          title: "show test data",
          description: "haha",
          imagesrc: "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
          content: "# yoyo↵↵## YOYO"
        });

      })(done);

    });
    it('json', function(done) {
      request.get('/post/'+testPost.id)
      .expect(200)
      .end(function(error, res) {
        (error == null).should.be.true
        var showPost = res.body
        showPost.should.have.properties("title", "description", "content", "imagesrc");



        done();
      });
    });
    it('markdown', function(done) {
      request.get('/post/'+testPost.id+"?format=md")
      .expect(200)
      .end(function(error, res) {
        (error == null).should.be.true
        var showPost = res.body
        showPost.should.have.properties("title", "description", "content", "imagesrc");
        showPost.content.should.startWith('<h1 ');

        showPost.id.should.be.equal(testPost.id);


        done();
      });
    });


  });


  describe('index', function() {

    testPost = {}

    before(function (done) {
      co(function *() {

        yield Post.create({
          title: "data1",
          description: "haha",
          imagesrc: "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
          content: "# yoyo↵↵## YOYO"
        });

        yield Post.create({
          title: "data2",
          description: "haha",
          imagesrc: "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
          content: "# yoyo↵↵## YOYO"
        });

        yield Post.create({
          title: "data3",
          description: "haha",
          imagesrc: "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
          content: "# yoyo↵↵## YOYO"
        });

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


});
