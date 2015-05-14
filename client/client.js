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
    console.log(data);
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

Template.post.onRendered(function() {
    $('img').addClass('img-responsive');
});

Template.post.helpers({
  current_post: function() {
    return Session.get('current_post');
  }
});
