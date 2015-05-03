if (Meteor.isClient) {
  Template.home.helpers({
    posts: function () {
      return Session.get('posts');
    }
  });

  Template.post.helpers({
    current_post: function() {
      return Session.get('current_post');
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
