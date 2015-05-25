Meteor.subscribe("posts");
Session.set('ppp', 10);

Template.home.onCreated(function(){
  var instance = this;
  instance.autorun(function () {
    var subscription = instance.subscribe('posts');
    if (subscription.ready()) {
      var postCount = Posts.find().count();
      console.log(postCount);
      console.log("> Received posts. \n\n")
      if (postCount > 0) {
        var data = Posts.find({}, {sort: {date: -1}, limit: Session.get('ppp')}).fetch();

        console.log('autorun');
        console.log(data);
        Session.set('posts', data);
      }
    } else {
      console.log("> Subscription is not ready yet. \n\n");
    }

  });

});

Template.home.onRendered(function() {

  // get updated posts from api and update db
  Meteor.call('getPosts', Session.get('ppp'), function(error, result) {
    if (error) {
      console.log(error);
    }else{
      console.log('limit :'+Session.get('ppp'));
      Session.set('posts', result);
      Meteor.call('updatePosts', result);
      $('.loadMore').text('Load more');
    }
  });

});

Template.home.helpers({
  posts: function () {
    Session.set('postId', null);
    var data = Session.get('posts');
    return data;
  }
});

Template.home.events({
  'click .loadMore': function(evt) {
    $(evt.currentTarget).text('Loading...');
    Meteor.call('getPosts', Session.get('ppp')+10, function(error, result) {
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
