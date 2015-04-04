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
	
	q2 = keystone.list('Item').model.find({
		default_skin: locals.skinid
	}).sort("name");
	
	q3 = keystone.list('Skin').model.find().sort("name");
	
	// Get the projects
	view.on('init', function(next) {
		q.exec(function(err, result) {
			q2.exec(function(err2, result2) {
				q3.exec(function(err3, result3) {
					if(result) {
						locals.title = result.name;
						locals.skin = result;
						locals.items = result2;
						locals.allSkins = result3;

						// If there are no results
						if(!result2) {
							req.flash('error', "No skins were found in the database.");
						}
					} else {
						locals.title = "Guild Wars 2 Wardrobe";
					}

					next(err);
				});
			});
		});
	});
	
	// Render the view
	view.render('skin');
};
