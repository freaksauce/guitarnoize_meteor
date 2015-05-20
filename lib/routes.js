Router.map(function() {

	this.route('loading', {
		path: '/',
		layoutTemplate: 'loadingTemplate',
		data: function() {
			$.getJSON( "http://guitarnoize.com/wp-json/posts", function( data ) {
				Session.setPersistent('posts', data);
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
			Session.setPersistent('postId',this.params.permalink);
		}
	});

});
