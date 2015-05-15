var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.user = req.user;
	locals.section = "profile";
	locals.title = locals.user.username;
	locals.filters = {
		id: locals.user._id
	}
	locals.form = {
		username: req.body.username,
		email: req.body.email,
		image: req.body.image,
		token: req.body.token,
		password: req.body.password,
		password2: req.body.password2,
		about: req.body.about
	}
	
	var q = keystone.list('User').model.update({
		_id: locals.filters.id
	}, {
		$set: {
			username: locals.form.username,
			email: locals.form.email,
			image: locals.form.image,
			token: locals.form.token,
			about: locals.form.about
		}
	});
	
	q.exec(function(err, result) {
		if(err) {
			req.flash('error', "No armors were found in the database.");
		}
		else {
			res.location("/profile");
			res.redirect("/profile");
		}
	});
};