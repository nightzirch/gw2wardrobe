var keystone = require('keystone'),
	async = require('async'),
	_ = require('underscore');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.user = req.user;
	locals.title = "Favorites";
	locals.section = "favorites";
	locals.tonicRegex = new RegExp("tonic", "i");
	
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
		69607,	// Balthazar's Regalia Outfit
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
	
	// Skins
	q = keystone.list('Skin').model.find({
		skinid: {
			$in: locals.user.favorites
		}
	}).sort("name");
	
	// Outfits
	q2 = keystone.list('Item').model.find({
		itemid: {
			$in: _.intersection(outfitArray, locals.user.favorites)
		}
	}).sort("name");
	
	// Tonics
	q3 = keystone.list('Item').model.find({
		name: {
			$regex: locals.tonicRegex
		}
	}).where("itemid").in(locals.user.favorites).sort("name");
	
	// allSkins
	q4 = keystone.list('Skin').model.find();
	
	// Get the projects
	view.on('init', function(next) {
		q.exec(function(err, result) {
			q2.exec(function(err2, result2) {
				q3.exec(function(err3, result3) {
					q4.exec(function(err4, result4) {
						if(result) {
							locals.skins = result;
						}
						if(result2) {
							locals.outfits = result2;
						}
						if(result3) {
							locals.tonics = result3;
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
	view.render('favorites');
};
