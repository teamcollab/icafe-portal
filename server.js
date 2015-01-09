require('coffee-react/register');
require("coffee-script/register");

'use strict';



/**
 * Dependencies
 */

var fs = require('fs');
var koa = require('koa');
var passport = require('koa-passport');
var db = require('./db');
var co = require('co');


var path = require('path');
global.appRoot = path.resolve(__dirname);

console.log("appRoot", appRoot);
/**
 * Config
 */
var config = require('./config/config');



/**
 * Server
 */
var app = module.exports  = koa();

require('./config/passport')(passport, config);

require('./config/koa')(app, config, passport);

// Routes
require('./config/routes')(app, passport);


// Start app

var start = function(done) {
  co(function *(){
    var connection = yield db.sequelize.client.sync({ force: true });
    // var connection = yield db.sequelize.client.sync();
    if(connection){

      if (!module.parent) {
        // test data
        require('./config/init-data')(config);


        app.listen(config.app.port);
        console.log('Server started, listening on port: ' + config.app.port);
      }

    }
  })(done);
}

if (!module.parent) {
  start()
}
module.exports.start = start
console.log('Environment: ' + config.app.env);
