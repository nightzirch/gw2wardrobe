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
	
	var outfitArray = [
		66279,	// Ancestral Outfit
		68577,	// Arcane Outfit
		67868,	// Arctic Explorer Outfit
//		0,		// Balthazar's Regalia
		65195,	// Bloody Prince's Outfit
		67040,	// Ceremonial Plated Outfit
		64756,	// Cook's Outfit
		68684,	// Crystal Nomad Outfit
		65194,	// Executioner's Outfit
		65198,	// Fancy Winter Outfit
		67374,	// Hexed Outfit
		68654,	// Imperial Outfit
		67990,	// Jungle Explorer Outfit
		65196,	// Mad King's Outfit
		67398,	// Noble Count Outfit
		64754,	// Pirate Captain's Outfit
		67037,	// Raiment of the Lich
		66658,	// Shadow Assassin Outfit
		65201	// Witch's Outfit
	];
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.query = req.params.query;
	locals.title = "Results for \"" + locals.query + "\"";
	locals.regex = new RegExp(locals.query, "i");
	locals.tonicRegex = new RegExp("tonic", "i");
	
	// Skins
	q = keystone.list('Skin').model.find({
		name: {
			$regex: locals.regex
		}
	}).sort("name");
	
	// Outfits
	q2 = keystone.list('Item').model.find({
		name: {
			$regex: locals.regex
		}
	}).where("itemid").in(outfitArray).sort("name");
	
	// Tonics
	q3 = keystone.list('Item').model.find({
		name: {
			$regex: locals.tonicRegex
		}
	}).where("type").in(["Consumable", "Gizmo"]).sort("name");
	
	// allSkins
	q4 = keystone.list('Skin').model.find().sort("name");
	
	// Get the projects
	view.on('init', function(next) {
		q.exec(function(err, result) {
			q2.exec(function(err2, result2) {
				q3.exec(function(err3, result3) {
					q4.exec(function(err4, result4) {
						console.log(locals.tonicRegex);
						
						if(result) {
							locals.skins = result;
							console.log("Skins length: " + result.length);
						}
						if(result2) {
							locals.outfits = result2;
							console.log("Outfits length: " + result2.length);
						}
						if(result3) {
							// Because I suck at combining two search words in one RegExp, I will have to do this shitty additional loop. Forgive me!
							var realResult3 = new Array();
							
							for(var i = 0; i < result3.length; i++) {
								var regexp = new RegExp(locals.query, "i");
								if(result3[i].name.match(regexp)) {
									realResult3.push(result3[i]);
								}
							}
							
							locals.tonics = realResult3;
							console.log("Tonics length: " + realResult3.length);
						}
						if(result4) {
							locals.allSkins = result4;
						}

						next(err);
					});
				});
			});
		});
	});
	
	// Render the view
	view.render('search');
};
