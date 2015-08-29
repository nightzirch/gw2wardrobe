var keystone = require('keystone'),
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
		// Validation failed
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
			if (locals.form.username.length > 5) {
				if (validateEmail(locals.form.email)) {
					if (locals.form.password == locals.form.password2) {
						if (validateToken(locals.form.token)) {
							console.log("Validated");
							return true;
						}
					}
				}
			}
		}
		console.log("Validation failed");
		console.log("username", locals.form.username);
		console.log("email", locals.form.email);
		console.log("password", locals.form.password);
		console.log("password2", locals.form.password2);
		console.log("token", locals.form.token);

		return false;
	}

	function post() {
		var q = keystone.list('User').model.insert({
			username: req.body.username,
			email: locals.form.email,
			password: locals.form.password,
			token: locals.form.token,
			registered: new Date(),

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
	}
};
