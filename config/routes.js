var router = require('koa-router');

var countController = require('../src/controllers/count');
var indexController = require('../src/controllers/index');
var authController = require('../src/controllers/auth');
var postController = require('../src/controllers/post');

var secured = function *(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    this.status = 401;
  }
};

module.exports = function (app, passport) {
  // register functions
  app.use(router(app));

  app.get('/isLogin', authController.isLogin);

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/#/',
    failureRedirect: '/#/login?error=local'
  }));


  app.get('/post/:id', postController.show);
  app.get('/post', postController.index);

  app.all("/logout", authController.logout);

  // Just to be able to create user to test our app
  app.get('/user/:username/:password', authController.createUser);

  app.get('/', indexController.index);

  // secured routes
  app.put('/post/:id', secured, postController.update);
  app.post('/post', secured, postController.create);
  app.get('/value', secured, countController.getCount);
  app.get('/inc', secured, countController.increment);
  app.get('/dec', secured, countController.decrement);
};
