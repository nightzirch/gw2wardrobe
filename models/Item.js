var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Skin Model
 * ==========
 */

var Item = new keystone.List('Item', {
	defaultSort: '+name'
});

Item.add({
	itemid: { type: Number, required: true, index: true, default: 0 },
	added: {
		datetime: { type: Types.Datetime, required: true, default: Date.now},
		build: { type: Number, required: true, default: 0},
	},
	name: { type: String, required: true, index: true },
	icon: { type: String, required: true, default: "http://placehold.it/64" },
	description: { type: String },
	type: { type: String },
	wikiUrl: { type: String },
	rarity: { type: String },
	level: { type: Number },
	vendor_value: { type: Number },
	default_skin: { type: Number },
	flags: {
		AccountBindOnUse: { type: Types.Boolean },
		AccountBound: { type: Types.Boolean },
		HideSuffix: { type: Types.Boolean },
		MonsterOnly: { type: Types.Boolean },
		NoMysticForge: { type: Types.Boolean },
		NoSalvage: { type: Types.Boolean },
		NoSell: { type: Types.Boolean },
		NotUpgradeable: { type: Types.Boolean },
		NoUnderwater: { type: Types.Boolean },
		SoulbindOnAcquire: { type: Types.Boolean },
		SoulBindOnUse: { type: Types.Boolean },
		Unique: { type: Types.Boolean }
	},
	game_types: {
		Activity: { type: Types.Boolean },
		Dungeon: { type: Types.Boolean },
		Pve: { type: Types.Boolean },
		Pvp: { type: Types.Boolean },
		PvpLobby: { type: Types.Boolean },
		Wvw: { type: Types.Boolean }
	},
	details: {
		type: { type: String },
		defense: { type: String },
		infusion_slots: {
			flags: {
				Defense: { type: Types.Boolean },
				Offense: { type: Types.Boolean },
				Utility: { type: Types.Boolean }
			}
		},
		infix_upgrade: {
			attributes: {
				attribute: { type: String },
				modifier: { type: Number }
			},
			buff: {
				skill_id: { type: String },
				description: { type: String }
			}
		},
		suffix_item_id: { type: Number },
		secondary_suffix_item_id: { type: Number },
		
		// Armor specific
		weight_class: { type: String },
		
		// Weapon specific
		damage_type: { type: String },
		min_power: { type: Number },
		max_power: { type: Number }
	}
});

Item.schema.add({
	restrictions: { type: [String] },
	images: { type: [String] }
});

/**
 * Registration
 */

Item.defaultColumns = 'name, type, details.type, rarity, level';
Item.register();
