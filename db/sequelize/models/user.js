var bcrypt = require('../../../lib/bcrypt_thunk'); // version that supports yields
var co = require('co');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING
      }
      // , {
      //     associate: function(models) {
      //         User.hasMany(models.Post);
      //     }
      // }
      ,
      {
        instanceMethods: {
          comparePassword: function *(candidatePassword) {
            return yield bcrypt.compare(candidatePassword, this.password);
          },
          passwordMatches: function *(password) {
            if (yield this.comparePassword(password)){
              return user;
            }
            throw new Error('Password does not match');
          },
          setToken: function*() {
            var salt = yield bcrypt.genSalt();
            var hash = yield bcrypt.hash(this.password, salt);
            this.password = hash;
          }

        }
      }

    );

    return User;
}
