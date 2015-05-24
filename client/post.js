Template.post.onRendered(function() {

  $('#loading').show();
  $('#current_post').fadeOut(0);

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
    $('#loading').hide();
    $('#current_post').fadeIn(500);
  }, 800);

});

Template.post.helpers({
  current_post: function() {
    var postId = Session.get('postId');
    var post = Posts.findOne({ID: parseInt(postId)});
    return post;
  },
});
