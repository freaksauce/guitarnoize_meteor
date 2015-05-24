Meteor.subscribe("posts");
Session.set('ppp', 10);

Template.home.onCreated(function(){
  var instance = this;

  instance.autorun(function () {
    var subscription = instance.subscribe('posts');
    if (subscription.ready()) {
      console.log("> Received posts. \n\n")
      var postCount = Posts.find().count();
      if (postCount > 0) {
        console.log(postCount);
        Session.set('posts', Posts.find({},{limit: 10}).fetch());
      }else{
        //db is empty, redirect to loader to populate db via rest api
        // Router.go('/');
      }
    } else {
      console.log("> Subscription is not ready yet. \n\n");
    }
  });

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
