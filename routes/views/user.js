var keystone = require('keystone'),
	async = require('async'),
	request = require('request');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	var successfulRequests = 0;
	var allRequests = 1;
	
	locals.username = req.params.username;
	locals.title = locals.username;
	locals.characters = null;

	var q = keystone.list('User').model.findOne({
		username: locals.username
	});
	
	q2 = keystone.list('Skin').model.find().sort("name");
	
	locals.section = "users";
	
	q.exec(function(err, result) {
		locals.profile = result;

		// Lets fetch /v2/characters from the API
		if(locals.profile.token) {
			request.get('https://api.guildwars2.com/v2/characters?page=0&page_size=200', {
				'auth': {
					'bearer': locals.profile.token
				}
			}, function(error, response, body) {
				if(error) {
					locals.characters = error;
				} else {
					locals.characters = JSON.parse(body);
					console.log(locals.characters);
				}

				requestCallback();
			});
		} else {
			requestCallback();
		}
	});
	
	function requestCallback() {
		successfulRequests++;
		
		if(successfulRequests == allRequests) {
			view.on('init', function(next) {
				q2.exec(function(err2, result2) {
					locals.allSkins = result2;

					next(err2);
				});
			});
			
			// Render the view
			view.render('user');
		}
	}
};
