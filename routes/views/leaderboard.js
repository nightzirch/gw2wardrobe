var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.title = "Leaderboard";
	locals.section = "leaderboard";

	q = keystone.list('User').model.find().sort("username");
	q2 = keystone.list('Skin').model.find().sort("name");

	// Get the projects
	view.on('init', function(next) {
		q.exec(function(err, result) {
			q2.exec(function(err2, result2) {
				locals.users = result;
				locals.allSkins = result2;
				next(err);
			});
		});
	});

	// Render the view
	view.render('leaderboard');
};
