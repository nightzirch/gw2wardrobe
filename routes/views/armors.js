var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'armors';
	locals.title = 'Armors';
	
	// Get the projects
	view.on('init', function(next) {
		var q = keystone.list('Skin').model.find({});

		q.exec(function(err, result) {
			locals.skins = result;

			// If there are no results
			if(!result) {
				req.flash('error', "No projects were found in the database.");
			}

			next(err);
		});
	});
	
	// Render the view
	view.render('armors');
};
