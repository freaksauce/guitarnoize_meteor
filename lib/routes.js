Router.map(function() {

	this.route('loading', {
		path: '/',
		layoutTemplate: 'loadingTemplate',
		data: function() {
			$.getJSON( "http://guitarnoize.com/wp-json/posts", function( data ) {
				Session.set('posts', data);
				Meteor.call('updatePosts', data, function (error, result) {
		      if (error) {
		        console.log(error);
		      }
		      if (result) {
		        console.log(result);
		      }
		    });
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
