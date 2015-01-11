


var db = require(appRoot+'/db');
var Post = db.sequelize.Post;
var User = db.sequelize.User;
var co = require('co');

var userService = require(appRoot+'/src/services/userService');

module.exports = function (config) {

  co(function *() {

    if(config.app.env === "development"){
      var post = yield Post.findOrCreate(
        {
          where: {
            title: "測試文章"
          },
          defaults: {
            title: "測試文章",
            description: "測試敘述",
            content: "# 主標題↵↵## 次標題"
          }
        }
      );



      var user = yield User.find({
        username: "user"
      });

      if(!user){
        yield userService.create("user", "user");
      }


    }

  })();

}
