var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	var q;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	if (req.params.weight) {
		locals.weight = req.params.weight.charAt(0).toUpperCase() + req.params.weight.slice(1)
		locals.section = 'armors-' + req.params.weight;
		locals.title = locals.weight + ' armors';
		locals.filters = {
			weight: locals.weight
		};
		
		q = keystone.list('Skin').model.find({
			type: 'Armor',
			"details.weight_class": locals.filters.weight
		});
	}
	else {
		locals.section = 'armors';
		locals.title = 'Armors';
		
		q = keystone.list('Skin').model.find({
			type: 'Armor'
		});
	}
	
	
	// Get the projects
	view.on('init', function(next) {
		q.exec(function(err, result) {
			locals.skins = result;

			// If there are no results
			if(!result) {
				req.flash('error', "No armors were found in the database.");
			}

			next(err);
		});
	});
	
	// Render the view
	view.render('armors');
};
