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
  getPosts: function(ppp) {
    ppp += 10;
    var url = "http://guitarnoize.com/wp-json/posts";
    var result = HTTP.get(url, {
      params: {
        'filter[posts_per_page]': ppp
      }
    });
    if (result.statusCode==200) {
    	var respJson = JSON.parse(result.content);
  		return respJson;
  	} else {
			console.log("Response issue: ", result.statusCode);
			var errorJson = JSON.parse(result.content);
			throw new Meteor.Error(result.statusCode, errorJson.error);
		}
  }

});

Meteor.publish("posts", function () {
  return Posts.find();
});
