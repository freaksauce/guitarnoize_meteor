Router.map(function() {

	this.route('loading', {
		path: '/',
		layoutTemplate: 'loadingTemplate',
		data: function() {
			$.getJSON( "http://guitarnoize.com/wp-json/posts", function( data ) {
				Session.setPersistent('posts', data);
				$('.logo').velocity({
					opacity: 0
				}, {duration:200, easing:'ease-out', complete: function() {
					Meteor.setTimeout(function() {
						Router.go('/home');
					}, 200);
				}});
			});
		}
	});

	this.route('home', {
		path: '/home/',
		layoutTemplate: 'defaultLayout'
	});

	this.route('post', {
		path: '/post/:permalink',
		layoutTemplate: 'defaultLayout',
		data: function() {
			Session.set('postId',this.params.permalink);
		}	
	});

});
