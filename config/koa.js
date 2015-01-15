var koaStatic = require('koa-static');
var session = require('koa-generic-session');
var responseTime = require('koa-response-time');
var logger = require('koa-logger');
var views = require('co-views');
var compress = require('koa-compress');
var onerror = require('koa-onerror');
var bodyParser = require('koa-bodyparser');

module.exports = function (app, config, passport) {
  if(!config.app.keys) throw new Error('Please add session secret key in the config file!');
  app.keys = config.app.keys;

  if(config.app.env != 'test')
    app.use(logger());



  onerror(app);
  app.use(koaStatic(config.app.root + '/public'));


  var filePath = config.app.file.path

  app.use(koaStatic(filePath));


  app.use(session({
    key: 'koareactfullexample.sid',
  }));
  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function *(next) {
    this.render = views('src/views', {
      default: 'jade'
    });
    yield next;
  });

  app.use(compress());
  app.use(responseTime());
};
