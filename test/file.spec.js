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
      authHelper.signAgent(request, done);
    })(done);
  });



  describe('create', function() {
    before(function (done) {
      authHelper.signAgent(request, done);
      var filePath = config.app.file.path

      if (!fs.existsSync(filePath)){
        fs.mkdirSync(filePath);
      }

    });

    it('create success', function(done) {

      request.post('/file')
      .attach('file', './test/fixtures/testImage.png')
      .expect(200)
      .end(function(error, res) {
        (error == null).should.be.true

        var file = res.body
        file.should.have.properties("name", "path", "mine");
        file.name.should.be.equal("testImage.png");


        done();
      });
    });
  });

});
