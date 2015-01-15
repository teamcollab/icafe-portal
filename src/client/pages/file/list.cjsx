
React = require('react');
restHelper = require('../../components/restHelper');

module.exports = React.createClass({
  getInitialState: ->
    this.load()

    return {
      files: []
    }

  load: ->
    console.log "loadfile ..."
    self = @
    restHelper.get "/file", (error, res) ->

      files = res.body.files
      self.setState {files: files}



  render: ->


    show = (file)->

      return (
        <tr>
          <th scope="row"><a href="/images/#{file}">{file}</a></th>
          <td>![{file}](/images/{file})</td>

        </tr>
      )


    return (
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>name</th>
              <th>md</th>

            </tr>
          </thead>
          <tbody>
            {this.state.files.map show}
          </tbody>
        </table>

      </div>
    );

})
