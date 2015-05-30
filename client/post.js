function reformatTemplate(instance) {
  var postDate = $('h3').text();
  var substrDate = postDate.substr(0,10);
  var dateArr = substrDate.split('-');
  console.log(dateArr);
  instance.$('h3').text('Published: '+dateArr[2]+'-'+dateArr[1]+'-'+dateArr[0]);
  instance.$('iframe').each(function() {
    var realSrc = $(this).data('src');
    instance.$(this).attr('src', realSrc);
    instance.$(this).wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
  });
  instance.$('img').each(function() {
    var realSrc = $(this).data('src');
    instance.$(this).attr('src', realSrc);
    instance.$(this).addClass('img-responsive');
  });
  instance.$('#loading').hide();
  instance.$('#current_post').fadeIn(500, function() {
    $('footer').fadeIn();
  });
}

Template.post.onRendered(function() {
  var instance = Template.instance();
  instance.$('#loading').show();
  instance.$('#current_post').fadeOut(0);

  instance.autorun(function() {
    var postId = Session.get('postId');
    var subscription = instance.subscribe('post', postId);
    if (subscription.ready()) {
      console.log('sub ready');
      reformatTemplate(instance);
    }
  });

});

Template.post.helpers({
  current_post: function() {
    var postId = Session.get('postId');
    var post = Posts.findOne({ID: parseInt(postId)});
    return post;
  },
});
