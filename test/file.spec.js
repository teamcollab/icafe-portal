var app, authHelper, co, databaseHelper, request, should;

should = require('should');
app = require('../server');
request = require('supertest').agent(app.listen());
authHelper = require('./middlewares/authenticator');
var co = require('co');
var config = require(appRoot+'/config/config');
var fs = require('fs');

describe('Image', function() {

  before(function (done) {
    co(function *() {
      yield authHelper.createUser();
    })(done);
  });



  describe('create', function() {
    before(function (done) {
      authHelper.signAgent(request, function(){
        var filePath = config.app.file.path

        if (!fs.existsSync(filePath+"/images")){
          fs.mkdirSync(filePath+"/images");
        }
        done();

      });

    });

    it('create success', function(done) {

      request.post('/file')
      .attach('file', './test/fixtures/testImage.png')
      .expect(200)
      .end(function(error, res) {
        console.log('error', error);
        (error == null).should.be.true

        var file = res.body
        file.should.have.properties("name", "path", "mine");
        file.name.should.be.equal("testImage.png");


        done();
      });
    });
  });

  describe.only('show', function() {

    var file = {}
    before(function (done) {
      authHelper.signAgent(request, function(){
        var filePath = config.app.file.path

        if (!fs.existsSync(filePath+"/images")){
          fs.mkdirSync(filePath+"/images");
        }

        request.post('/file')
        .attach('file', './test/fixtures/testImage.png')
        .expect(200)
        .end(function(error, res) {
          file = res.body
          done()
        })

      });


    });


    it('show success', function(done) {

      request.get('/images/'+file.name)
      .expect(200)
      .end(function(error, res) {
        (error == null).should.be.true
        done()
      })

    });

    it('list file', function(done) {

      request.get('/file')
      .expect(200)
      .end(function(error, res) {
        console.log("error", error);
        (error == null).should.be.true

        var files = res.body.files;
        console.log("=== files ======", files);
        (files.length > 0).should.be.true

        done()
      })

    });
  });


});
