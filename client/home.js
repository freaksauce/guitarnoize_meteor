Meteor.subscribe("posts");
Session.set('ppp', 10);

Template.home.onCreated(function() {
  if (Session.get('posts') == undefined) {
    Router.go('loading');
  }
});

Template.home.helpers({
  posts: function () {
    Session.set('postId', null);
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

Template.home.events({
  'click .loadMore': function(evt) {
    $(evt.currentTarget).text('Loading...');
    Meteor.call('getPosts', Session.get('ppp'), function(error, result) {
      if (error) {
        console.log(error);
      }else{
        Session.set('ppp', Session.get('ppp')+10);
        console.log(Session.get('ppp'));
        Session.set('posts', result);
        Meteor.call('updatePosts', result);
        $(evt.currentTarget).text('Load more');
      }
    });
  }
});
