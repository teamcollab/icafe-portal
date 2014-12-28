exports.index = function *() {
  var username = ""

  if(this.isAuthenticated())
    username = this.passport.user.username
  this.body = yield this.render("index", {
    isLogin: this.isAuthenticated(),
    username: username
  });
};
