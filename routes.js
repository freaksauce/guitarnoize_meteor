Router.map(function() {
	this.route('loading', {
		path: '/',
		layoutTemplate: 'loadingTemplate',
		data: function() {
			$.getJSON( "http://guitarnoize.com/wp-json/posts", function( data ) {
				Session.set('posts', data);
				$('.logo').velocity({
					marginTop: '-=50px',
					opacity: 0
				}, 400, function() {
					Router.go('/home');
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
			var permalinkVar = this.params.permalink;
			$.getJSON( "http://guitarnoize.com/wp-json/posts/"+permalinkVar, function( data ) {
				Session.set('current_post', data);
				Meteor.setTimeout(function() {
					var postDate = $('h3').text();
					var substrDate = postDate.substr(0,10);
					var dateArr = substrDate.split('-');
					$('h3').text('Published: '+dateArr[2]+'-'+dateArr[1]+'-'+dateArr[0]);
					$('iframe').each(function() {
						var realSrc = $(this).data('src');
						console.log(realSrc);
						$(this).attr('src', realSrc);
					});
					$('img').each(function() {
						var realSrc = $(this).data('src');
						$(this).attr('src', realSrc);
					});
				}, 200);
			});
		}
	});
});
