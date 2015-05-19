Meteor.methods({
  updatePosts: function(data) {

    _.each(data, function(post) {
      // console.log(post);
      myID = post.ID;
      myTitle = post.title;
      myDate = post.date;
      myContent = post.content;

      Posts.upsert({ID: myID}, {
        // Modifier
        $set: {
            ID: myID,
            title: myTitle,
            date: myDate,
            content: myContent
        }
      });

    });
  },

});

Meteor.publish("posts", function () {
  return Posts.find();
});
