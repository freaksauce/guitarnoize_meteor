posts = new Mongo.Collection('posts');

if (Meteor.isClient) {

  Template.loadingTemplate.onRendered(function() {
    Meteor.setTimeout(function() {
      $('.logo').addClass('show');
    }, 100);
  });

  Template.home.onCreated(function() {
    if (Session.get('posts') == undefined) {
      Router.go('loading');
    }
  });

  Template.home.helpers({
    posts: function () {
      var data = Session.get('posts');
      Meteor.call('updatePosts', data, function (error, result) {
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log(result);
        }
      });
      return data;
    }
  });

  Template.post.helpers({
    current_post: function() {
      return Session.get('current_post');
    }
  })
}

if (Meteor.isServer) {


  Meteor.methods({
    updatePosts: function(data) {
      // console.log(data.title);
      _.each(data, function(post) {
        var ID = post.ID;
        var title = post.title;

        posts.insert({
          ID: ID,
          title: title
        });

      })

    }
  });

}
