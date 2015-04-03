var keystone = require('keystone'),
	mongo = require('mongodb'),
	monk = require('monk'),
	db = monk('localhost:27017/guild-wars-2-wardrobe'),
	async = require('async'),
	request = require('request');

var baseUrlSkins = "https://api.guildwars2.com/v2/skins/",
	baseUrlItems = "https://api.guildwars2.com/v2/items/",
	n = 10,
	skinsListArr,
	skinsArr = new Array(),
	skinsCollection = db.get("skins"),
	skinsDbArr = new Array(),
	itemsListArr,
	itemsArr = new Array();
	itemsCollection = db.get("items"),
	itemsDbArr = new Array();

// Find existing skins in database
skinsCollection.find({}, function(err, docs) {
	console.log("Fetching skin collection from database.");
	
	var skinsDbArrTemp = docs;
	
	for(var i = 0; i < skinsDbArrTemp.length; i++) {
		skinsDbArr.push(skinsDbArrTemp[i].skinid);
	}
	
	console.log("Done fetching skin collection. Length of array: " + skinsDbArrTemp.length);
});

// Find existing items in database
itemsCollection.find({}, function(err, docs) {
	console.log("Fetching items collection from database.");
	
	var itemsDbArrTemp = docs;
	
	for(var i = 0; i < itemsDbArrTemp.length; i++) {
		itemsDbArr.push(itemsDbArrTemp[i].itemid);
	}
	
	console.log("Done fetching items collection. Length of array: " + itemsDbArrTemp.length);
});


function requestSkins() {
	request(baseUrlSkins, function(error, response, body) {
		console.log("Requesting JSON array of skin IDs.");

		// What a gross way to parse an array...
		skinsListArr = body.split("[")[1].split("]")[0].split(",");

		for(var i = 0; i < skinsListArr.length; i++){
			// If not already in database
			var id = skinsListArr[i];
			if(skinsDbArr.indexOf(parseInt(id)) == -1) {
				// Add to queue
				skinQueue.push(id);
			}
		}

		console.log("JSON array of skin IDs done. Length of array: " + skinsListArr.length);
	});
}

function requestItems() {
	request(baseUrlItems, function(error, response, body) {
		console.log("Requesting JSON array of item IDs.");

		// What a gross way to parse an array...
		itemsListArr = body.split("[")[1].split("]")[0].split(",");

		for(var i = 0; i < itemsListArr.length; i++){
			// If not already in database
			var id = itemsListArr[i];
			if(itemsDbArr.indexOf(parseInt(id)) == -1) {
				// Add to queue
				itemQueue.push(id);
			}
		}

		console.log("JSON array of item IDs done. Length of array: " + itemsListArr.length);
	});
}

var skinQueue = async.queue(function (doc, callback) {
    request({
		baseUrl: baseUrlSkins,
		url: doc
	}, function(error, response, body){
		// Skin fetched and parsed
		var skin = JSON.parse(body);
		console.log("Skin fetched with id: " + skin.id);
		
		// Adding skin to skinsArr
		skinsArr.push(skin);
		
		// Adding skin to database
		writeToDatabase(skin, "skin");
		
		// Callback I have no idea is doing
    	callback(error, skin);
    })
},n);

// On complete
skinQueue.drain = function() {
    console.log('All skins have been processed.');
}

var itemQueue = async.queue(function (doc, callback) {
    request({
		baseUrl: baseUrlItems,
		url: doc
	}, function(error, response, body){
		// Skin fetched and parsed
		var item = JSON.parse(body);
		console.log("Item fetched with id: " + item.id);
		
		// Adding skin to skinsArr
		itemsArr.push(item);
		
		// Adding skin to database
		writeToDatabase(item, "item");
		
		// Callback I have no idea is doing
    	callback(error, item);
    })
},n);

// On complete
itemQueue.drain = function() {
    console.log('All items have been processed.');
}

function writeToDatabase(item, type) {
	if(type == "skin") {
		// Add new skins to database
		skinsCollection.insert({
			skinid: item.id ? item.id : "",
			name: item.name ? item.name : "",
			type: item.type ? item.type : "",
			flags: {
				ShowInWardrobe: (item.flags.indexOf("ShowInWardrobe") == -1) ? true : false,
				NoCost: (item.flags.indexOf("NoCost") == -1) ? true : false,
				HideIfLocked: (item.flags.indexOf("HideIfLocked") == -1) ? true : false
			},
			icon: item.icon ? item.icon : "",
			description: item.description ? item.description : "",
			details: {
				type: (item.details && item.details.type) ? item.details.type : "",
				weapon_category: getWeaponCategory(item),
				weight_class: (item.details && item.details.weight_class) ? item.details.weight_class : ""
			},
			typeUrl: getTypeUrl(item),
			wikiUrl: getWikiUrl(item)
		}, function(err, doc) {
			console.log("Skin added to database with id: " + doc.skinid);
		});
	} else if(type == "item") {
		// Add new skins to database
		itemsCollection.insert({
			itemid: item.id ? item.id : "",
			name: item.name ? item.name : "",
			type: item.type ? item.type : "",
			added: {
				build: 0
			},
			rarity: item.rarity ? item.rarity : "",
			level: item.level ? item.level : "",
			vendor_value: item.vendor_value ? item.vendor_value : "",
			default_skin: item.default_skin ? item.default_skin : "",
			flags: {
				ShowInWardrobe: (item.flags.indexOf("ShowInWardrobe") == -1) ? true : false,
				NoCost: (item.flags.indexOf("NoCost") == -1) ? true : false,
				HideIfLocked: (item.flags.indexOf("HideIfLocked") == -1) ? true : false,
				
				AccountBindOnUse: (item.flags.indexOf("AccountBindOnUse") == -1) ? true : false,
				AccountBound: (item.flags.indexOf("AccountBound") == -1) ? true : false,
				HideSuffix: (item.flags.indexOf("HideSuffix") == -1) ? true : false,
				MonsterOnly: (item.flags.indexOf("MonsterOnly") == -1) ? true : false,
				NoMysticForge: (item.flags.indexOf("NoMysticForge") == -1) ? true : false,
				NoSalvage: (item.flags.indexOf("NoSalvage") == -1) ? true : false,
				NoSell: (item.flags.indexOf("NoSell") == -1) ? true : false,
				NotUpgradeable: (item.flags.indexOf("NotUpgradeable") == -1) ? true : false,
				NoUnderwater: (item.flags.indexOf("NoUnderwater") == -1) ? true : false,
				SoulbindOnAcquire: (item.flags.indexOf("SoulbindOnAcquire") == -1) ? true : false,
				SoulBindOnUse: (item.flags.indexOf("SoulBindOnUse") == -1) ? true : false,
				Unique: (item.flags.indexOf("Unique") == -1) ? true : false,
			},
			game_types: {
				Activity: (item.game_types.indexOf("Activity") == -1) ? true : false,
				Dungeon: (item.game_types.indexOf("Dungeon") == -1) ? true : false,
				Pve: (item.game_types.indexOf("Pve") == -1) ? true : false,
				Pvp: (item.game_types.indexOf("Pvp") == -1) ? true : false,
				PvpLobby: (item.game_types.indexOf("PvpLobby") == -1) ? true : false,
				Wvw: (item.game_types.indexOf("Wvw") == -1) ? true : false,
			},
			icon: item.icon ? item.icon : "",
			description: item.description ? item.description : "",
			details: {
				type: (item.details && item.details.type) ? item.details.type : "",
				defense: (item.details && item.details.defense) ? item.details.defense : "",
				infusion_slots: {
					flags: {
						Defense: (item.details && item.details.infusion_slots && item.details.infusion_slots.flags && item.details.infusion_slots.flags.indexOf("Defense") == -1) ? true : false,
						Offense: (item.details && item.details.infusion_slots && item.details.infusion_slots.flags && item.details.infusion_slots.flags.indexOf("Offense") == -1) ? true : false,
						Utility: (item.details && item.details.infusion_slots && item.details.infusion_slots.flags && item.details.infusion_slots.flags.indexOf("Utility") == -1) ? true : false
					}
				},
				infix_upgrade: {
					attributes: {
						attribute: (item.details && item.details.infix_upgrade && item.details.infix_upgrade.attributes && item.details.infix_upgrade.attributes.attribute) ? item.details.infix_upgrade.attributes.attribute : "",
						modifier: (item.details && item.details.infix_upgrade && item.details.infix_upgrade.attributes && item.details.infix_upgrade.attributes.modifier) ? parseInt(item.details.infix_upgrade.attributes.modifier) : null
					},
					buff: {
						skill_id: (item.details && item.details.infix_upgrade && item.details.infix_upgrade.buff && item.details.infix_upgrade.buff.skill_id) ? item.details.infix_upgrade.buff.skill_id : "",
						description: (item.details && item.details.infix_upgrade && item.details.infix_upgrade.buff && item.details.infix_upgrade.buff.description) ? item.details.infix_upgrade.buff.description : ""
					}
				},
				suffix_item_id: (item.details && item.details.suffix_item_id) ? parseInt(item.details.suffix_item_id) : null,
				secondary_suffix_item_id: (item.details && item.details.secondary_suffix_item_id) ? parseInt(item.details.secondary_suffix_item_id) : null,
				weight_class: (item.details && item.details.weight_class) ? item.details.weight_class : "",
				damage_type: (item.details && item.details.damage_type) ? item.details.damage_type : "",
				min_power: (item.details && item.details.min_power) ? parseInt(item.details.min_power) : null,
				max_power: (item.details && item.details.max_power) ? parseInt(item.details.max_power) : null,
				weapon_category: getWeaponCategory(item),
			},
			typeUrl: getTypeUrl(item),
			wikiUrl: getWikiUrl(item)
		}, function(err, doc) {
			console.log("Item added to database with id: " + doc.itemid);
		});
	}
	
}

function getWeaponCategory(item) {
	if(item.type && item.type == "Weapon") {
		// Weapon Category
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
				if (item.details.type == weaponTypes[i][y]) {
					weaponType = weaponTypesNames[i];
				}
			}
		}

		return weaponType;
	} else {
		return "";
	}
}

function getTypeUrl(item) {
	if(item.type) {
		return item.type.toLowerCase() + "s";
	} else {
		return "";
	}
}

function getWikiUrl(item) {
	if(!item.wikiUrl && item.name) {
		return "http://wiki.guildwars2.com/wiki/" + item.name;
	} else {
		return "";
	}
}


// Start this shit!
requestSkins();
requestItems();