var LocalStrategy = require('passport-local').Strategy;
var authenticator = require('../lib/authenticator');

var db = require(appRoot+'/db');
var User = db.sequelize.User;


var serialize = function (user, done) {
  done(null, user.id);
};

var deserialize = function (id, done) {

  User.find(id).then(function(user){
    done(null, user);
  });
};

module.exports = function (passport, config) {
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
  passport.use(new LocalStrategy(authenticator.localUser));
};
