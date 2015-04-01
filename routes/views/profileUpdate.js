var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.user = req.user;
	locals.section = "profile";
	
	if(locals.user.name.first && locals.user.name.last) {
		locals.name = locals.user.name.first + " " + locals.user.name.last;
	}
	else if(locals.user.name.first) {
		locals.name = locals.user.name.first;
	}
	else if(locals.user.name.last) {
		locals.name = locals.user.name.last;
	}
	else {
		locals.name = "Profile"
	}
	
	locals.title = locals.name;
	locals.filters = {
		id: locals.user._id
	}
	locals.form = {
		name: {
			first: req.body.first_name,
			last: req.body.last_name
		},
		email: req.body.email,
		password: req.body.password,
		password2: req.body.password2,
		about: req.body.about
	}
	
	var q = keystone.list('User').model.update({
		_id: locals.filters.id
	}, {
		$set: {
			name: locals.form.name,
			email: locals.form.email,
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