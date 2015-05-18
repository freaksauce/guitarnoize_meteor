Meteor.methods({
  updatePosts: function(data) {

    _.each(data, function(post) {
      // console.log(post.title);
      myID = post.ID;
      myTitle = post.title;
console.log(myID);
      var myInsert = posts.insert({
        ID: myID,
        title: myTitle
      });
      console.log(myInsert);

    });
  }
});

Meteor.publish("posts", function () {
  return Posts.find();
});
