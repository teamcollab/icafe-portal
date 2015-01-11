var db = require(appRoot+'/db');
var User = db.sequelize.User;


exports.create = function *(username, password) {

  var user = User.build({ username: username, password: password });
  yield user.setToken();

  return yield user.save();
};
