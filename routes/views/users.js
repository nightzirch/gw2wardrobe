var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.title = "Users";
	locals.section = "users";
	
	q = keystone.list('User').model.find().sort("name");
	
	// Get the projects
	view.on('init', function(next) {
		q2.exec(function(err2, result2) {
			locals.users = result;

			next(err);
		});
		
	});
	
	// Render the view
	view.render('users');
};
