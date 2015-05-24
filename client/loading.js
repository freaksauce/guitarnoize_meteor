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
