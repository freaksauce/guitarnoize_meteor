Meteor.methods({
  updatePosts: function(data) {

    _.each(data, function(post) {
      // console.log(post.title);
      myID = post.ID;
      myTitle = post.title;
console.log(myID);
      posts.insert({
        ID: myID,
        title: myTitle
      });

    });
  }
});
