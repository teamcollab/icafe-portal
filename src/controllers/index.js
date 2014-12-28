exports.index = function *() {
  this.body = yield this.render("index", {
    isLogin: this.isAuthenticated()
  });
};
