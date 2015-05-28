Router.map(function() {

	this.route('loading', {
		path: '/',
		layoutTemplate: 'loadingTemplate'
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
