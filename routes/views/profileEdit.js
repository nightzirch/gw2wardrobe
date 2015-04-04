var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.user = req.user;
	locals.section = "profile";
	locals.title = "Edit " + locals.user.username;
	locals.filters = {
		id: locals.user._id
	}
	
	var q = keystone.list('User').model.findOne({
		_id: locals.filters.id
	});
	
	q2 = keystone.list('Skin').model.find().sort("name");
	
	// Get the projects
	view.on('init', function(next) {
		q.exec(function(err, result) {
			q2.exec(function(err2, result2) {
				locals.user = result;
				locals.allSkins = result2;
				
				// If there are no results
				if(!result) {
					req.flash('error', "No armors were found in the database.");
				}
			});
			
			next(err);
		});
	});
	
	// Render the view
	view.render('profileEdit');
};
