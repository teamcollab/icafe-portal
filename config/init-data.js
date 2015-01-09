


var db = require(appRoot+'/db');
var Post = db.sequelize.Post;
var co = require('co');

module.exports = function (config) {

  co(function *() {

    if(config.app.env === "development"){
      var post = Post.build({
        title: "hello",
        description: "haha",
        content: "# yoyo↵↵## YOYO"
      });
      // console.log(yield post.save());
    }

  })();

}
