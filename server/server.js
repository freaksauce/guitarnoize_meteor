Meteor.methods({
  updatePosts: function(data) {

    _.each(data, function(post) {
      // console.log(post.title);
      var ID = post.ID;
      var title = post.title;

      // posts.insert({
      //   ID: ID,
      //   title: title
      // });

    });
  }
});
