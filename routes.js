Router.map(function() {
	this.route('home', {
		path: '/',
		layoutTemplate: 'defaultLayout',
		data: function() {
			$.getJSON( "http://guitarnoize.com/wp-json/posts", function( data ) {
				Session.set('posts', data);
			});

		}
	});
	this.route('post', {
		path: '/post/:permalink',
		data: function() {
			var permalinkVar = this.params.permalink;
			console.log(permalinkVar);
			$.getJSON( "http://guitarnoize.com/wp-json/posts/"+permalinkVar, function( data ) {
				Session.set('current_post', data);
				console.log(Session.get('current_post'));
			});
		},
		layoutTemplate: 'defaultLayout'
	});
});