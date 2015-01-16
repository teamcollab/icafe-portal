
React = require('react');
t = require('tcomb-form');

Post = t.struct({
  title: t.maybe t.Str
  description: t.maybe t.Str
  imagesrc: t.maybe t.Str
  content: t.maybe t.Str

});

Form = t.form.create(Post, {
  auto: 'labels',
  fields: {
    content: {
      type: 'textarea'

    }
  }
});

module.exports = Form
