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
						$(this).attr('src', realSrc);
						$(this).wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
					});
					$('img').each(function() {
						var realSrc = $(this).data('src');
						$(this).attr('src', realSrc);
						$(this).addClass('img-responsive');
					});
				}, 200);
			});
		}
	});
});
