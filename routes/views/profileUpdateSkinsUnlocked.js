var keystone = require('keystone'),
	async = require('async'),
	request = require('request');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals,
		successfulRequests = 0,
		completedRequests = 0,
		allRequests = 1;

	locals.user = req.user;
	locals.filters = {
		id: locals.user._id
	}



	// Lets fetch /v2/account/skins from the API
	if(locals.user.token) {
		request.get('https://api.guildwars2.com/v2/account/skins', {
			'auth': {
				'bearer': locals.user.token
			}
		}, function(error, response, body) {
			if(error) {
				locals.unlockedSkins = error;
			} else {
				locals.unlockedSkins = JSON.parse(body);
			}

			console.log("Unlocked skins fetched.");
			successfulRequests++;
			requestCallback();
		});
	} else {
		console.log("No API token");
		requestCallback();
	}

	function requestCallback() {
		completedRequests++;

		if(completedRequests == allRequests) {
			if(successfulRequests == completedRequests) {
				var q = keystone.list('User').model.update({
					_id: locals.filters.id
				}, {
					$set: {
						wardrobe: locals.unlockedSkins
					}
				});
			}

			q.exec(function(err, result) {
				if(err) {
					req.flash('error', "No armors were found in the database.");
				}
				else {
					res.location("/profile");
					res.redirect("/profile");
				}
			});
		}
	}
};
