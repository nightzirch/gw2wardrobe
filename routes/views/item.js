var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	var q;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.itemid = req.params.itemid;

	q = keystone.list('Item').model.findOne({
		itemid: locals.itemid
	});
	
	// Get the projects
	view.on('init', function(next) {
		q.exec(function(err, result) {
			if(result) {
				locals.title = result.name;
				locals.item = result;
			} else {
				locals.title = "Guild Wars 2 Wardrobe";
			}

			next(err);
		});
	});
	
	// Render the view
	view.render('item');
};
