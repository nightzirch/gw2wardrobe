var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.username = req.params.username;
	locals.title = locals.username;

	var q = keystone.list('User').model.findOne({
		username: locals.username
	});
	
	q2 = keystone.list('Skin').model.find().sort("name");
	
	locals.section = "users";
	
	view.on('init', function(next) {
		q2.exec(function(err2, result2) {
			locals.allSkins = result2;

			
			q.exec(function(err, result) {
				locals.profile = result;

				next(err);
			});
		});
	});
	
	// Render the view
	view.render('user');
};
