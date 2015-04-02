var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	console.log(req.user);
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.user = req.user;
	locals.section = "profile";
	locals.title = locals.user.username;
	locals.filters = {
		id: locals.user._id
	}
	
	
	
	var q = keystone.list('User').model.findOne({
		_id: locals.filters.id
	});
	
	// Get the projects
	view.on('init', function(next) {
		q.exec(function(err, result) {
			locals.user = result;

			// If there are no results
			if(!result) {
				req.flash('error', "No armors were found in the database.");
			}

			next(err);
		});
	});
	
	// Render the view
	view.render('profile');
};
