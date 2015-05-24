Template.defaultLayout.helpers({
  isPostPage: function() {
    if (Session.get('postId') !== null) {
      return true;
    }
  },
  year: function() {
    var d = new Date();
    return d.getFullYear();
  }
});
Template.defaultLayout.events({
  'click #homeBtn': function() {
    Router.go('/home');
  }
});
