var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	var q;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	if (req.params.weight) {
		locals.weight = req.params.weight.charAt(0).toUpperCase() + req.params.weight.slice(1)
		locals.section = 'armors-' + req.params.weight;
		locals.title = locals.weight + ' armors';
		locals.filters = {
			weight: locals.weight
		};
		
		q = keystone.list('Skin').model.find({
			type: 'Armor',
			"details.weight_class": locals.filters.weight
		}).sort("name");
	}
	else {
		locals.section = 'armors';
		locals.title = 'Armors';
		
		q = keystone.list('Skin').model.find({
			type: 'Armor'
		}).sort("name");
	}
	
	q2 = keystone.list('Skin').model.find().sort("name");
	
	
	// Armor weights
	if (req.params.weight) {
		locals.armorTypes = {
			"Helm": [
				{ name: "Helmet", weight: locals.weight }
			],
			"Shoulders": [
				{ name: "Shoulders", weight: locals.weight }
			],
			"Coat": [
				{ name: "Chest", weight: locals.weight }
			],
			"Gloves": [
				{ name: "Gloves", weight: locals.weight }
			],
			"Leggings": [
				{ name: "Leggings", weight: locals.weight }
			],
			"Boots": [
				{ name: "Boots", weight: locals.weight }
			]
		};
	} else {
		locals.armorTypes = {
			"Helm": [
				{ name: "Helmet", weight: "Light" },
				{ name: "Helmet", weight: "Medium" },
				{ name: "Helmet", weight: "Heavy" }
			],
			"Shoulders": [
				{ name: "Shoulders", weight: "Light" },
				{ name: "Shoulders", weight: "Medium" },
				{ name: "Shoulders", weight: "Heavy" }
			],
			"Coat": [
				{ name: "Chest", weight: "Light" },
				{ name: "Chest", weight: "Medium" },
				{ name: "Chest", weight: "Heavy" }
			],
			"Gloves": [
				{ name: "Gloves", weight: "Light" },
				{ name: "Gloves", weight: "Medium" },
				{ name: "Gloves", weight: "Heavy" }
			],
			"Leggings": [
				{ name: "Leggings", weight: "Light" },
				{ name: "Leggings", weight: "Medium" },
				{ name: "Leggings", weight: "Heavy" }
			],
			"Boots": [
				{ name: "Boots", weight: "Light" },
				{ name: "Boots", weight: "Medium" },
				{ name: "Boots", weight: "Heavy" }
			]
		};
	}
	
	
	// Get the projects
	view.on('init', function(next) {
		q.exec(function(err, result) {
			q2.exec(function(err2, result2) {
				locals.skins = result;
				locals.allSkins = result2;

				// If there are no results
				if(!result) {
					req.flash('error', "No armors were found in the database.");
				}

				next(err);	
			});
		});
	});
	
	// Render the view
	view.render('armors');
};
