Meteor.subscribe("posts");

function aniLogo() {
  $('.logo').animate({
    top: '120px',
    width: '150px',
    height: '110px',
    marginLeft: '-75px'
  }, {
    duration:600,
    easing:'easeOutExpo',
    complete: function() {
      Meteor.setTimeout(function() {
        Router.go('/home');
      }, 200);
    }
  });
}

Template.loadingTemplate.onRendered(function() {
  $('.logo').addClass('show');
  Meteor.setTimeout(function() {
    aniLogo();
  }, 1000);
});

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
})

Template.home.onCreated(function() {
  if (Session.get('posts') == undefined) {
    Router.go('loading');
  }
});

Template.home.helpers({
  posts: function () {
    Session.set('postId', null);
    var data = Session.get('posts');
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
