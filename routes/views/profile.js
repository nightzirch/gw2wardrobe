var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	console.log(req.user);
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.user = req.user;
	locals.section = "profile";
	
	if(locals.user.name.first && locals.user.name.last) {
		locals.name = locals.user.name.first + " " + locals.user.name.last;
	}
	else if(locals.user.name.first) {
		locals.name = locals.user.name.first;
	}
	else if(locals.user.name.last) {
		locals.name = locals.user.name.last;
	}
	else {
		locals.name = "Profile"
	}
	
	locals.title = locals.name;
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
