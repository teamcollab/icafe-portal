
React = require('react');
restHelper = require('../../components/restHelper');

module.exports = React.createClass({


  handleSubmit: (e) ->

    e.preventDefault();

    file = document.getElementsByName("file")[0].files[0];
    self = @

    restHelper.upload "/file", file, (error, res) ->
      console.log "res.body", res.body

      self.props.afterCreate();



  render: ->
    return (
      <div>

        <form action="/file" onSubmit={this.handleSubmit} method="post" encType="multipart/form-data">
          <input type="file" name="file" multiple="" />
          <input type="submit" value="Upload" className='btn btn-primary' />
        </form>

      </div>
    );

})
