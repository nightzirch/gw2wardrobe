var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.title = "Users";
	locals.section = "users";
	
	q = keystone.list('User').model.find().sort("name");
	q2 = keystone.list('Skin').model.find().sort("name");
	
	// Get the projects
	view.on('init', function(next) {
		q2.exec(function(err2, result2) {
			q.exec(function(err, result) {
				locals.users = result;
				locals.allSkins = result2;

				next(err);
			});
		});
		
	});
	
	// Render the view
	view.render('users');
};
