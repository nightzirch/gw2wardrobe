var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var Outfit = new keystone.List('Outfit');

Outfit.add({
	outfitid: { type: Number, required: true, index: true, default: 0 },
	name: { type: String, required: true },
	creator: { type: String, required: true, initial: true },
	created: {
		datetime: { type: Types.Datetime, required: true, default: Date.now},
		build: { type: Number, required: true, default: 0},
	},
	slots: {
		head: { type: Number },
		shoulders: { type: Number },
		chest: { type: Number },
		gloves: { type: Number },
		leggings: { type: Number },
		boots: { type: Number }
	},
	about: { type: Types.Textarea },
	image: { type: Types.Url, default: "http://placehold.it/128" },
	rating: {
		up: { type: Number, default: 0 },
		down: { type: Number, default: 0 }
	}
});


/**
 * Registration
 */

Outfit.defaultColumns = 'name, creator, created.datetime';
Outfit.register();
