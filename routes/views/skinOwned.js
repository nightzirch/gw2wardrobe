var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.user = req.user;
	locals.ownedArr = locals.user.wardrobe;
	locals.filters = {
		id: locals.user._id
	}
	locals.data = {
		skinid: req.params.skinid,
		owned: req.param('owned')
	}
	
	// Let's add!
	if(locals.data.owned == "true") {
		locals.ownedArr.push(locals.data.skinid);
	} else {
		var index = locals.ownedArr.indexOf(locals.data.skinid)
		locals.ownedArr.splice(index, 1);
	}
	
	
	var q = keystone.list('User').model.update({
		_id: locals.filters.id
	}, {
		$set: {
			wardrobe: locals.ownedArr
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