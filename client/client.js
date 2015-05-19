Meteor.subscribe("posts");

Template.loadingTemplate.onRendered(function() {
  Meteor.setTimeout(function() {
    $('.logo').addClass('show');
  }, 100);
});

Template.home.onCreated(function() {
  if (Session.get('posts') == undefined) {
    Router.go('loading');
  }
});

Template.home.helpers({
  posts: function () {
    var data = Session.get('posts');
    console.log(data);
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

Template.post.onCreated(function() {
});

Template.post.onRendered(function() {
  $('#current_post').fadeOut(1);

  Meteor.setTimeout(function() {
    var postDate = $('h3').text();
    var substrDate = postDate.substr(0,10);
    var dateArr = substrDate.split('-');
    $('h3').text('Published: '+dateArr[2]+'-'+dateArr[1]+'-'+dateArr[0]);
    $('iframe').each(function() {
      var realSrc = $(this).data('src');
      $(this).attr('src', realSrc);
      $(this).wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    });
    $('img').each(function() {
      var realSrc = $(this).data('src');
      $(this).attr('src', realSrc);
      $(this).addClass('img-responsive');
    });
    $('#current_post').fadeIn(500);
  }, 800);

});

Template.post.helpers({
  current_post: function() {
    var postId = Session.get('postId');
    var post = Posts.findOne({ID: parseInt(postId)});
    return post;
  }
});
