var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.user = req.user;
	locals.favoriteArr = locals.user.favorites;
	locals.filters = {
		id: locals.user._id
	}
	locals.data = {
		skinid: req.params.skinid,
		favorite: req.param('favorite')
	}
	
	// Let's add!
	if(locals.data.favorite == "true") {
		locals.favoriteArr.push(locals.data.skinid);
	} else {
		var index = locals.favoriteArr.indexOf(locals.data.skinid)
		locals.favoriteArr.splice(index, 1);
	}
	
	
	var q = keystone.list('User').model.update({
		_id: locals.filters.id
	}, {
		$set: {
			favorites: locals.favoriteArr
		}
	});
	
	q.exec(function(err, result) {
		if(err) {
			req.flash('error', "No armors were found in the database.");
		}
		else {
			
		}
	});
};