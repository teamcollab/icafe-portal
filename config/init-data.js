


var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var co = require('co');

module.exports = function (config) {

  co(function *() {

    if(config.app.env === "development"){
      var post = new Post({
        title: "hello",
        description: "haha",
        content: "# yoyo↵↵## YOYO"
      });
      console.log(yield post.save());
    }

  })();

}
