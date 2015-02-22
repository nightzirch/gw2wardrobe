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
		weapon_category: { type: String },
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

Skin.schema.pre('save', function(next) {
	var weaponTypes = [
		["Greatsword", "Hammer", "LongBow", "Rifle", "ShortBow", "Staff"],
		["Axe", "Dagger", "Mace", "Pistol", "Scepter", "Sword"],
		["Focus", "Shield", "Torch", "Warhorn"],
		["Harpoon", "Speargun", "Trident"]
	];
	var weaponTypesNames = ["twohanded", "onehanded", "offhand", "aquatic"];
	var weaponType = null;
	
	for (var i = 0; i < weaponTypes.length; i++) {
		for (var y = 0; y < weaponTypes[i].length; y++) {
			if (this.details.type == weaponTypes[i][y]) {
				weaponType = weaponTypesNames[i];
			}
		}
	}
	
	this.details.weapon_category = weaponType;
	next();
});


/**
 * Registration
 */

Skin.defaultColumns = 'name, type, added.build';
Skin.register();
