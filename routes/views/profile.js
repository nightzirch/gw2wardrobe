var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	if(req.user) {
		locals.user = req.user;
		locals.title = locals.user.username;
		locals.filters = {
			id: locals.user._id
		}
		
		var q = keystone.list('User').model.findOne({
			_id: locals.filters.id
		});
	} else {
		locals.user = null;
		locals.title = "Profile";
		
		var q = keystone.list('User').model.find();
	}
	
	locals.section = "profile";
	
	// Get the projects
	view.on('init', function(next) {
		if(req.user) {
			q.exec(function(err, result) {
				locals.user = result;

				// If there are no results
				if(!result) {
					req.flash('error', "No armors were found in the database.");
				}

				next(err);
			});
		} else {
			q.exec(function(err, result) {
				// If there are no results
				if(!result) {
					req.flash('error', "No armors were found in the database.");
				}

				next(err);
			});
		}
	});
	
	// Render the view
	view.render('profile');
};
