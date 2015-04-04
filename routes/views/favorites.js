var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.user = req.user;
	locals.title = "Favorites";
	locals.section = "favorites";
	locals.types = {
		"Armor": "Armors",
		"Weapon": "Weapons"
	}
	
	// locals.section is used to set the currently selected
	// item in the header navigation.

	var q = keystone.list('Skin').model.find().sort("name");
	
	// Get the projects
	view.on('init', function(next) {
		q.exec(function(err, result) {
			locals.skins = result;
			locals.allSkins = result;

			// If there are no results
			if(!result) {
				req.flash('error', "No skins were found in the database.");
			}

			next(err);
		});
	});
	
	// Render the view
	view.render('favorites');
};
