var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	var q;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	if (req.params.type) {
		locals.type = req.params.type.charAt(0).toUpperCase() + req.params.type.slice(1)
		locals.section = 'weapons-' + req.params.type;
		locals.title = locals.type + ' weapons';
		locals.filters = {
			type: locals.type
		};
		
		q = keystone.list('Skin').model.find({
			type: 'Weapon',
			"details.weapon_category": req.params.type
		});
	}
	else {
		locals.section = 'weapons';
		locals.title = 'Weapons';
		
		q = keystone.list('Skin').model.find({
			type: 'Weapon'
		});
	}
	
	// Weapon Types
	if (req.params.type && req.params.type == "twohanded") {
		locals.weaponTypes = {
			"Greatsword": "Greatsword",
			"Hammer": "Hammer",
			"LongBow": "Longbow",
			"Rifle": "Rifle",
			"ShortBow": "Short bow",
			"Staff": "Staff"
		};
	} else if (req.params.type && req.params.type == "onehanded") {
		locals.weaponTypes = {
			"Axe": "Axe",
			"Dagger": "Dagger",
			"Mace": "Mace",
			"Pistol": "Pistol",
			"Scepter": "Scepter",
			"Sword": "Sword"
		};
	} else if (req.params.type && req.params.type == "offhand") {
		locals.weaponTypes = {
			"Focus": "Focus",
			"Shield": "Shield",
			"Torch": "Torch",
			"Warhorn": "Warhorn"
		};
	} else if (req.params.type && req.params.type == "aquatic") {
		locals.weaponTypes = {
			"Harpoon": "Harpoon gun",
			"Speargun": "Spear",
			"Trident": "Trident"
		};
	} else {
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
	}
	
	
	// Get the projects
	view.on('init', function(next) {
		q.exec(function(err, result) {
			locals.skins = result;

			// If there are no results
			if(!result) {
				req.flash('error', "No weapons were found in the database.");
			}

			next(err);
		});
	});
	
	// Render the view
	view.render('weapons');
};
