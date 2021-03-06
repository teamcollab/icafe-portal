var router = require('koa-router');

var indexController = require('../src/controllers/index');
var authController = require('../src/controllers/auth');
var postController = require('../src/controllers/post');
var fileController = require('../src/controllers/file');


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

  app.get('/file', fileController.index);

  app.all("/logout", authController.logout);

  // Just to be able to create user to test our app
  app.get('/user/:username/:password', authController.createUser);

  app.get('/', indexController.index);

  // secured routes
  app.post('/file', fileController.save);
  app.delete('/post/:id', secured, postController.delete);
  app.put('/post/:id', secured, postController.update);
  app.post('/post', secured, postController.create);
};
