var db = require(appRoot+'/db');
var User = db.sequelize.User;
var userService = require(appRoot+'/src/services/userService');


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
    user = yield userService.create(this.params.username, this.params.password);
    this.redirect('/#/login?usercreated=1');
  } catch (err) {
    console.log("err", err);
    this.redirect('/#/login?usercreated=0');
  }

};
