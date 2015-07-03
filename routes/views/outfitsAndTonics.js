var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.title = "Outfits and tonics";
	locals.section = "outfits-and-tonics";
	locals.tonicRegex = new RegExp("tonic", "i");
	
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
		69623,	// Exemplar Attire Outfit
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
	
	var q = keystone.list('Item').model.find({
		itemid: {
			$in: outfitArray
		}
	}).sort("name");
	
	var q2 = keystone.list('Item').model.find({
		name: {
			$regex: locals.tonicRegex
		},
		type: {
			$in: ["Consumable", "Gizmo"]
		}
	}).sort("name");
	
	view.on('init', function(next) {
		q.exec(function(err, result) {
			q2.exec(function(err2, result2) {
				locals.outfits = result;
				locals.tonics = result2;

				next(err);
			});
		});
	});
	
	// Render the view
	view.render('outfits-and-tonics');
};