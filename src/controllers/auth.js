var db = require(appRoot+'/db');
var User = db.sequelize.User;


exports.login = function *() {
  this.body = yield this.render('index');
};

exports.isLogin = function *() {
  this.body = this.isAuthenticated();
};


exports.logout = function *() {
  this.logout();
  this.session = null;
  this.redirect("/#/login");
};

exports.createUser = function *() {

  try {
    var user = User.build({ username: this.params.username, password: this.params.password });
    yield user.setToken();
    user = yield user.save();
    this.redirect('/#/login?usercreated=1');
  } catch (err) {
    console.log("err", err);
    this.redirect('/#/login?usercreated=0');
  }
};
