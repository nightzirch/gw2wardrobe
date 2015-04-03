var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	var q,
		q2;
	
	locals.armorTypes = {
		"Helm": "Helmet",
		"Shoulders": "Shoulders",
		"Coat": "Chest",
		"Gloves": "Gloves",
		"Leggings": "Leggings",
		"Boots": "Boots"
	};
	
	locals.weaponTypes = {
		"Axe": "Axe",
		"Dagger": "Dagger",
		"Focus": "Focus",
		"Greatsword": "Greatsword",
		"Hammer": "Hammer",
		"Harpoon": "Harpoon gun",
		"LongBow": "Longbow",
		"Mace": "Mace",
		"Pistol": "Pistol",
		"Rifle": "Rifle",
		"Scepter": "Scepter",
		"Shield": "Shield",
		"ShortBow": "Short bow",
		"Speargun": "Spear",
		"Staff": "Staff",
		"Sword": "Sword",
		"Torch": "Torch",
		"Trident": "Trident",
		"Warhorn": "Warhorn"
	};
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.query = req.params.query;
	locals.title = "Results for \"" + locals.query + "\"";
	locals.regex = new RegExp(locals.query, "i");
	
	console.log(locals.regex);

	q = keystone.list('Skin').model.find({
		name: {
			$regex: locals.regex
		}
	});
	
	q2 = keystone.list('Item').model.find({
		name: {
			$regex: locals.regex
		}
	});
	
	// Get the projects
	view.on('init', function(next) {
		q.exec(function(err, result) {
			q2.exec(function(err2, result2) {
				console.log(result);
				
				if(result) {
					locals.skins = result;
				}
				if(result2) {
					locals.items = result2;
				}
				
				next(err);
			});
		});
	});
	
	// Render the view
	view.render('search');
};
