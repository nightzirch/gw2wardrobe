var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.title = "Outfits";
	locals.section = "outfits";
	
	var q = keystone.list('Outfit').model.find().sort("rating.up");
	var q2 = keystone.list('Skin').model.find();
	
	view.on('init', function(next) {
		q.exec(function(err, result) {
			q2.exec(function(err2, result2) {
				locals.outfits = result;
				locals.allSkins = result2;
				
				next(err);
			});
		});
	});
	
	// Render the view
	view.render('outfits');
};