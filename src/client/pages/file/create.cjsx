
React = require('react');
restHelper = require('../../components/restHelper');


module.exports = React.createClass({

  create: ->
    value = this.refs.postForm.getValue()

    self = @

    restHelper.post "/file", value, (res) ->

      return self.transitionTo('/login') if res.unauthorized

      self.transitionTo('/file/'+res.body.id);

  render: ->
    return (
      <div>

        <form action="/file" method="post" encType="multipart/form-data">
          <input type="file" name="file" multiple="" />
          <input type="submit" value="Upload" />
        </form>
      </div>
    );

})
