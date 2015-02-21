var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	var q;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	if (req.params.type) {
		locals.type = req.params.type.charAt(0).toUpperCase() + req.params.type.slice(1)
		locals.section = 'weapons-' + req.params.type;
		locals.title = locals.type + ' weapons';
		locals.filters = {
			type: locals.type
		};
		
		q = keystone.list('Skin').model.find({
			type: 'Weapon'
		});
	}
	else {
		locals.section = 'weapons';
		locals.title = 'Weapons';
		
		q = keystone.list('Skin').model.find({
			type: 'Weapon'
		});
	}
	
	
	// Get the projects
	view.on('init', function(next) {
		q.exec(function(err, result) {
			locals.skins = result;

			// If there are no results
			if(!result) {
				req.flash('error', "No weapons were found in the database.");
			}

			next(err);
		});
	});
	
	// Render the view
	view.render('weapons');
};
