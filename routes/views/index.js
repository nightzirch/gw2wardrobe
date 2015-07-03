var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.title = 'Guild Wars 2 Wardrobe';
	
	q = keystone.list('Skin').model.find().sort("name");
	
	view.on('init', function(next) {
		q.exec(function(err, result) {
			locals.skins = result;

			// If there are no results
			if(!result) {
				req.flash('error', "No skins were found in the database.");
			}

			next(err);
		});
	});
	
	// Render the view
	view.render('index');
	
};
