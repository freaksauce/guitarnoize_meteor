Meteor.methods({
  updatePosts: function(data) {

    _.each(data, function(post) {
      // console.log(post.title);
      myID = post.ID;
      myTitle = post.title;
      myContent = post.content;
console.log(post);
      // var myInsert = Posts.insert({
      //   ID: myID,
      //   title: myTitle
      // });
      Posts.upsert({ID: myID}, {
        // Modifier
        $set: {
            ID: myID,
            title: myTitle,
            content: myContent
        }
      });

    });
  }
});

Meteor.publish("posts", function () {
  return Posts.find();
});
