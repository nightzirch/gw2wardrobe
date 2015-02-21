var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Skin Model
 * ==========
 */

var Skin = new keystone.List('Skin', {
	defaultSort: '-added.build'
});

Skin.add({
	skinid: { type: Number, required: true, index: true, default: 0 },
	name: { type: String, required: true, index: true },
	added: {
		datetime: { type: Types.Datetime, required: true, default: Date.now},
		build: { type: Number, required: true, default: 0},
	},
	type: { type: String },
	flags: {
		ShowInWardrobe: { type: Types.Boolean },
		NoCost: { type: Types.Boolean },
		HideIfLocked: { type: Types.Boolean }
	},
	icon: { type: String, required: true, default: "http://placehold.it/64" },
	description: { type: String },
	details: {
		type: { type: String },
		weight_class: { type: String },
		damage_type: { type: String }
	}	
});

Skin.schema.add({
	restrictions: { type: [String] }
});


/**
 * Weapon type
 */

Skin.schema.virtual('isTwoHanded').get(function() {
	weaponTypes = ["Greatsword", "Hammer", "LongBow", "Rifle", "ShortBow", "Staff"];
	
	for (var i = 0; i < weaponTypes.length; i++) {
		if (this.details.type == weaponTypes[i]) {
			return true;
		}
	}
	
	return false;
});

Skin.schema.virtual('isOneHanded').get(function() {
	weaponTypes = ["Axe", "Dagger", "Mace", "Pistol", "Scepter", "Sword"];
	
	for (var i = 0; i < weaponTypes.length; i++) {
		if (this.details.type == weaponTypes[i]) {
			return true;
		}
	}
	
	return false;
});

Skin.schema.virtual('isOffhand').get(function() {
	weaponTypes = ["Focus", "Shield", "Torch", "Warhorn"];
	
	for (var i = 0; i < weaponTypes.length; i++) {
		if (this.details.type == weaponTypes[i]) {
			return true;
		}
	}
	
	return false;
});

Skin.schema.virtual('isAquatic').get(function() {
	weaponTypes = ["Harpoon", "Speargun", "Trident"];
	
	for (var i = 0; i < weaponTypes.length; i++) {
		if (this.details.type == weaponTypes[i]) {
			return true;
		}
	}
	
	return false;
});



/**
 * Registration
 */

Skin.defaultColumns = 'name, type, added.build|20%';
Skin.register();
