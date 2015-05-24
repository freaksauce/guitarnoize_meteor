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
      console.log('ani logo complete');
      Router.go('/home');
    }
  });
}

Template.loadingTemplate.onCreated(function() {
  var instance = this;

  instance.autorun(function () {
    var subscription = instance.subscribe('posts');
    if (subscription.ready()) {
      Meteor.setTimeout(function() {
        aniLogo();
      }, 500);
      console.log('move along')
    }
  });

});

Template.loadingTemplate.onRendered(function() {
  $('.logo').addClass('show');
});
