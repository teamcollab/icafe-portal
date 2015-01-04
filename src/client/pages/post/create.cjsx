
React = require('react');
t = require('tcomb-form');
Navigation = require('react-router').Navigation

restHelper = require('../../components/restHelper');


Post = t.struct({
  title: t.Str,
  description: t.maybe(t.Str),
  content: t.Str
});

Form = t.form.create(Post, {
  auto: 'labels',
  fields: {
    content: {
      type: 'textarea'
      config: {
        height: "100vh"
      }
    }
  }
});

module.exports = React.createClass({
  mixins: [Navigation],

  onClick: ->
    value = this.refs.form.getValue()

    self = @

    restHelper.post "/post", value, (res) ->

      return self.transitionTo('/login') if res.unauthorized

      self.transitionTo('/post/'+res.body._id);

  render: ->
    return (
      <div>
        <Form ref='form' />
        <button onClick={this.onClick} className='btn btn-primary' >
          submit
        </button>
      </div>
    );

})
