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
    );

    return User;
}
