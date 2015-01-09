var db = require(appRoot+'/db');
var User = db.sequelize.User;

var co = require('co');

exports.localUser = function (username, password, done) {
  co(function *() {
    try {
      user = yield User.find({ 'username': username.toLowerCase() })

      return yield user.passwordMatches(password);
    } catch (ex) {
      return null;
    }
  })(done);
};
