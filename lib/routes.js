Router.map(function() {

	this.route('home', {
		path: '/',
		layoutTemplate: 'defaultLayout',
		fastRender: true
	});

	this.route('post', {
		path: '/post/:permalink',
		layoutTemplate: 'defaultLayout',
		data: function() {
			Session.set('postId',this.params.permalink);
		},
		fastRender: true
	});

});
