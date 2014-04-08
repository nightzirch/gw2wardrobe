/*
	Script for Guild Wars 2 Wardrobe
	gw2wardrobe.com
	
	By Christian Grimsgaard
	christiangrimsgaard.net
*/

$(document).ready(function() {
	gw2w.ready();
});

var gw2w = {
	ready: function() {
		// Populate
		//gw2w.populate.items();
		gw2w.populate.types();
		gw2w.populate.armors();
		gw2w.populate.weapons();
		
		// Plugins
		gw2w.plugins.tooltip();
		
		// Creates a view model object from the class
		gw2w.vm = new gw2w.viewModel();
		
		// Applies the view model
		ko.applyBindings(gw2w.vm);
	},
	
	// The view model object
	vm: null,
	
	// The view model class
	viewModel: function() {
		var self = this;
		
		// Armor and weapon array
		self.armors = ko.observableArray();
		self.weapons = ko.observableArray();
		self.armorSubtypes = ko.observableArray();
		self.weaponSubtypes = ko.observableArray();
	},
	
	api: {
		items: function() {
			return "https://api.guildwars2.com/v1/items.json";
		},
		itemDetails: function() {
			return "https://api.guildwars2.com/v1/item_details.json";
		},
		gw2spidy: {
			types: function() {
				return "http://www.gw2spidy.com/api/v0.9/json/types";
			},
			allArmors: function() {
				return "http://www.gw2spidy.com/api/v0.9/json/all-items/0";
			},
			allWeapons: function() {
				return "http://www.gw2spidy.com/api/v0.9/json/all-items/18";
			}
		}
	},
	
	class: {
		// Class to represent an armor item
		armor: function(obj) {
			var self = this;
			self.id = obj.data_id;
			self.name = obj.name;
			self.img = obj.img;
			self.type = obj.type_id;
			self.subType = obj.sub_type_id;
		},		
		// Class to represent a weapon item
		weapon: function(obj) {
			var self = this;
			self.id = obj.data_id;
			self.name = obj.name;
			self.img = obj.img;
			self.type = obj.type_id;
			self.subType = obj.sub_type_id;
		},
		// Class to represent armor subtypes
		armorSubtype: function(obj) {
			var self = this;
			self.id = obj.id;
			self.name = obj.name;
		},
		// Class to represent weapon subtypes
		weaponSubtype: function(obj) {
			var self = this;
			self.id = obj.id;
			self.name = obj.name;
		}
	},
	
	populate: {
		items: function() {
			var url = gw2w.api.items();
			
			$.ajax({
				dataType: "json",
				url: url,
				success: function(data) {
					console.log(data);
					gw2w.items.raw = data;
					
					// Callback to details
					// gw2w.populate.details();
				}
			});
		},
		details: function() {
			$.each(gw2w.items.raw.items, function(index, value) {
				var id = value;
				var url = gw2w.api.itemDetails();
				url = url + "?item_id=" + id;
				var arr = new Array();
				
				console.log(id);
				
				$.ajax({
					dataType: "json",
					url: url,/*
					data: {
						item_id: id
					},*/
					success: function(data) {
						arr.push(data);
					}
				});
			});
		},
		types: function() {
			var url = gw2w.api.gw2spidy.types();
			
			$.ajax({
				dataType: "json",
				url: url,
				success: function(data) {
					console.log(data);
					gw2w.items.types = data;
					gw2w.process.types();
				}
			});
		},
		armors: function() {
			var url = gw2w.api.gw2spidy.allArmors();
			
			$.ajax({
				dataType: "json",
				url: url,
				success: function(data) {
					console.log(data);
					gw2w.items.armors = data;
					gw2w.process.armors();
				}
			});
		},
		weapons: function() {
			var url = gw2w.api.gw2spidy.allWeapons();
			
			$.ajax({
				dataType: "json",
				url: url,
				success: function(data) {
					console.log(data);
					gw2w.items.weapons = data;
					gw2w.process.weapons();
				}
			});
		}
	},
	
	process: {
		armors: function() {
			var vm = gw2w.vm;
			var armors = gw2w.items.armors.results;
			
			$.each(armors, function(index, obj) {
				var i = obj.sub_type_id;
				
				// Lets organize the armor types.
				// We place the object into a multidimentional array.
				vm.armors()[i]().value().push(new gw2w.class.armor(obj));
			});
		},
		weapons: function() {
			var vm = gw2w.vm;
			var weapons = gw2w.items.weapons.results;
			
			$.each(weapons, function(index, obj) {
				var i = obj.sub_type_id;
				
				// Lets organize the weapon types.
				// We place the object into a multidimentional array.
				vm.weapons()[i]().value().push(new gw2w.class.weapon(obj));
			});
		},
		types: function() {
			var vm = gw2w.vm;
			var armorSubtypes = gw2w.items.types.results[0].subtypes;
			var weaponSubtypes = gw2w.items.types.results[12].subtypes;
			
			// Lets organize the types into subtypes for armors
			$.each(armorSubtypes, function(index, obj) {
				// Lets organize the types into subtypes for armors and weapons.
				vm.armorSubtypes()[obj.id] = new gw2w.class.armorSubtype(obj);
			});
			
			// Lets organize the types into subtypes for weapons
			$.each(weaponSubtypes, function(index, obj) {
				// Lets organize the types into subtypes for armors and weapons.
				vm.weaponSubtypes()[obj.id] = new gw2w.class.weaponSubtype(obj);
			});
			
			// Creating multidimentional arrays inside gw2w.vm.armors and gw2w.vm.weapons
			$.each(armorSubtypes, function(index, obj) {
				//vm.armors()[obj.id] = {"name": obj.name, "value": ko.observableArray()};
				vm.armors()[obj.id] = ko.observableArray([{"name": obj.name}, {"value": ko.observableArray()}]);
			});
			$.each(weaponSubtypes, function(index, obj) {
				//vm.weapons()[obj.id] = {"name": obj.name, "value": ko.observableArray()};
				vm.weapons()[obj.id] = ko.observableArray([{"name": obj.name}, {"value": ko.observableArray()}]);
			});
		}
	},
	
	items: {
		list: null,
		raw: null,
		types: null,
		armors: null,
		weapons: null
	},
	
	plugins: {
		tooltip: function() {
			$.gw2tooltip('[data-gw2item]');
		}
	}
}
































