var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	var q;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.skinid = req.params.skinid;

	q = keystone.list('Skin').model.findOne({
		skinid: locals.skinid
	});
	
	// Get the projects
	view.on('init', function(next) {
		q.exec(function(err, result) {
			console.log(result);
			
			locals.title = result.name;
			locals.skin = result;

			// If there are no results
			if(!result) {
				req.flash('error', "No armors were found in the database.");
			}

			next(err);
		});
	});
	
	// Render the view
	view.render('skin');
};
