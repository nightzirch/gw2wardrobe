var keystone = require('keystone'),
	async = require('async'),
	request = require('request');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;

	var successfulRequests = 0;
	var allRequests = 1;

	if(req.user) {
		locals.user = req.user;
		locals.title = locals.user.username;
		locals.filters = {
			id: locals.user._id
		}
		locals.tokenResponse = null;
		locals.characters = null;
		locals.unlockedSkins = null;

		var q = keystone.list('User').model.findOne({
			_id: locals.filters.id
		});
	} else {
		locals.user = null;
		locals.title = "Profile";

		var q = keystone.list('User').model.find();
	}

	q2 = keystone.list('Skin').model.find().sort("name");

	locals.section = "profile";


	// Lets fetch /v2/account from the API
	// if(locals.user.token) {
	// 	request.get('https://api.guildwars2.com/v2/account', {
	// 		'auth': {
	// 			'bearer': locals.user.token
	// 		}
	// 	}, function(error, response, body) {
	// 		if(error) {
	// 			locals.tokenResponse = error;
	// 		} else {
	// 			locals.tokenResponse = JSON.parse(body);
	// 		}
	//
	// 		requestCallback();
	// 	});
	// } else {
	// 	requestCallback();
	// }


	// Lets fetch /v2/characters from the API
	if(locals.user.token) {
		request.get('https://api.guildwars2.com/v2/characters?page=0&page_size=200', {
			'auth': {
				'bearer': locals.user.token
			}
		}, function(error, response, body) {
			if(error) {
				locals.characters = error;
			} else {
				locals.characters = JSON.parse(body);
			}

			requestCallback();
		});
	} else {
		requestCallback();
	}

	// // Lets fetch /v2/account/skins from the API
	// if(locals.user.token) {
	// 	request.get('https://api.guildwars2.com/v2/account/skins', {
	// 		'auth': {
	// 			'bearer': locals.user.token
	// 		}
	// 	}, function(error, response, body) {
	// 		if(error) {
	// 			locals.unlockedSkins = error;
	// 		} else {
	// 			locals.unlockedSkins = JSON.parse(body);
	// 			console.log(locals.unlockedSkins);
	// 		}
	//
	// 		requestCallback();
	// 	});
	// } else {
	// 	requestCallback();
	// }

	function requestCallback() {
		successfulRequests++;

		if(successfulRequests == allRequests) {
			view.on('init', function(next) {
				q2.exec(function(err2, result2) {
					if(req.user) {
						q.exec(function(err, result) {
							locals.user = result;
							locals.allSkins = result2;

							// If there are no results
							if(!result) {
								req.flash('error', "No armors were found in the database.");
							}

							next(err);
						});
					} else {
						q.exec(function(err, result) {
							locals.allSkins = result2;

							// If there are no results
							if(!result) {
								req.flash('error', "No armors were found in the database.");
							}

							next(err);
						});
					}
				});
			});

			// Render the view
			view.render('profile');
		}
	}
};
