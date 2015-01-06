
React = require('react');
t = require('tcomb-form');

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

module.exports = Form
