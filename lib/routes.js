Router.map(function() {

	this.route('home', {
		path: '/',
		layoutTemplate: 'defaultLayout',
		fastRender: true
	});

	this.route('post', {
		path: '/post/:postid',
		layoutTemplate: 'defaultLayout',
		data: function() {
			Session.setPersistent('postId',this.params.postid);
		}
	});

});
