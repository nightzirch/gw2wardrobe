var keystone = require('keystone'),
	User = keystone.list('User'),
	async = require('async'),
	bcrypt = require('bcrypt-nodejs');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.form = {
		username: req.body.username,
		email: req.body.email,
        password: req.body.password,
		password2: req.body.password2,
        token: req.body.token
	}

	if (validate()) {
		post();
	} else {
		// console.log("Failed");
		//
		// res.location("/register");
		// res.redirect("/register");
	}

	function validateEmail(email) {
	    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    return regex.test(email);
	}

	function validateToken(token) {
		var regex = /^([A-F]|[0-9]){8}-([A-F]|[0-9]){4}-([A-F]|[0-9]){4}-([A-F]|[0-9]){4}-([A-F]|[0-9]){20}-([A-F]|[0-9]){4}-([A-F]|[0-9]){4}-([A-F]|[0-9]){4}-([A-F]|[0-9]){12}\b/i;
		return regex.test(token);
	}

	function validate() {
		if (locals.form.username && locals.form.email && locals.form.password && locals.form.password2 && locals.form.token) {
			if (locals.form.username.length > 3) {
				if (validateEmail(locals.form.email)) {
					if (locals.form.password == locals.form.password2) {
						if (validateToken(locals.form.token)) {
							return true;
						}
					}
				}
			}
		}

		return false;
	}

	function post() {
		var newUser = new User.model({
			username: req.body.username,
			email: locals.form.email,
			password: locals.form.password,
			token: locals.form.token
		});

		newUser.save(function(err) {
			if(err) {

			}
			else {
				res.location("/login");
				res.redirect("/login");
			}
		});
	}
};
