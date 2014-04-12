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
		// Creates a view model object from the class
		gw2w.vm = new gw2w.viewModel();
		
		// Applies the view model
		ko.applyBindings(gw2w.vm);
		
		// Fetch ALL the stuff o/
		$.when(
			// Start loading
			gw2w.loading(true),
			
			// Types
			$.ajax({
				dataType: "json",
				url: gw2w.api.gw2spidy.types(),
				success: function(data) {
					gw2w.items.types = data;
					gw2w.process.types();
				}
			}),
			
			// Armors
			$.ajax({
				dataType: "json",
				url: gw2w.api.gw2spidy.allArmors(),
				success: function(data) {
					gw2w.items.armors = data;
					gw2w.process.armors();
				}
			}),
			
			// Weapons
			$.ajax({
				dataType: "json",
				url: gw2w.api.gw2spidy.allWeapons(),
				success: function(data) {
					gw2w.items.weapons = data;
					gw2w.process.weapons();
				}
			})
		).then(function() {
			// Stop loading
			gw2w.loading(false),
				
			// Update
			gw2w.update();
			
			// Storage
			gw2w.storage.get();
			
			// Plugins
			gw2w.plugins.tooltip();
			$('.gw2tooltip').tooltip()
			
			// Listeners
			gw2w.listeners.all();
		});
	},
	
	// The view model object
	vm: null,
	
	// The view model class
	viewModel: function() {
		var self = this;
		
		// Pathname
		self.pathHome = ko.computed(function() {
			var path = document.location.pathname;
			var pathClean = path.replace(new RegExp("/", "g"), "");
			
			if(pathClean.length < 1) {
				return true;
			}
			else {
				return false;
			}
		});
		
		// Loading
		self.loading = ko.observable(false);
		
		// Armor and weapon array
		self.armors = ko.observableArray();
		self.weapons = ko.observableArray();
		self.armorSubtypes = ko.observableArray();
		self.weaponSubtypes = ko.observableArray();
		
		// Item details
		self.detailEmpty = ko.observable(true);
		self.detailId = ko.observable(null);
		self.detailName = ko.observable(null);
		self.detailDesc = ko.observable(null);
		self.detailIcon = ko.observable(null);
		self.detailImage = ko.observable(null);
		self.detailPage = ko.observable(null);
		self.detailAcquire = ko.observable(null);
		self.detailRecipe = ko.observable(false);
		
		self.detailRecipeText = ko.computed(function(){
			var text = 'This item is created through a recipe. Check out <a href="' + self.detailPage() + '">the Official Wiki</a> for the recipe.';
			return text;
		});
		
		// Tracker array
		self.tracker = ko.observableArray();
		self.trackerAvailable = ko.observable(true);
		self.trackerAddText = ko.computed(function() {
			// If we're allowed to add stuff to the tracker
			if(self.trackerAvailable()) {
				return "Add to tracker";
			}
			// If there's nothing to add
			else if(!self.detailId()) {
				return "Add to tracker";
			}
			// If we're not...
			else {
				return "Already in tracker";
			}
		});
	},
	
	api: {
		items: function() {
			return "https://api.guildwars2.com/v1/items.json";
		},
		itemDetails: function(id) {
			return "https://api.guildwars2.com/v1/item_details.json?item_id=" + id;
		},
		render: function(sig, id) {
			return "https://render.guildwars2.com/file/" + sig + "/" + id + ".jpg";
		},
		itemPage: function(name) {
			// Getting rid of spaces in the name
			name = gw2w.general.replace(" ", "_", name);
			
			return "http://wiki.guildwars2.com/wiki/" + name;
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
	
	general: {
		unspacify: function(str) {
			return str.split(" ").join("");
		},
		replace: function(find, replace, str) {
			return str.replace(new RegExp(find, 'g'), replace);
		}
	},
	
	listeners: {
		all: function() {
			gw2w.listeners.itemBlock();
			gw2w.listeners.trackerAdd();
			gw2w.listeners.collapseToggle();
		},
		itemBlock: function() {
			$(".itemBlock").on("click", function() {
				var id = $(this).attr("data-gw2item");
				gw2w.populate.itemDetails(id);
			});
		},
		trackerAdd: function() {
			$("#trackerAdd").on("click", function() {
				gw2w.tracker.add();
				gw2w.tracker.exist(gw2w.vm.detailId());
			});
		},
		collapseToggle: function() {
			$("#collapseToggle").on("click", function(e) {
				e.preventDefault();
				var panels = $("#itemsContainer .panel-collapse.in");
				
				// If any of the panels are not collapsed, collapse all
				if(panels.length > 0) {
					$("#itemsContainer .panel-collapse").collapse("hide");
				}
				// If all are collapsed, show all
				else {
					$("#itemsContainer .panel-collapse").collapse("show");
				}
			});
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
		},
		// Class for the tracker
		trackerItem: function(obj) {
			var self = this;
			self.id = obj.id;
			self.name = obj.name;
			self.icon = obj.icon;
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
		itemDetails: function(id) {
			var url = gw2w.api.itemDetails(id);
			
			$.ajax({
				dataType: "json",
				url: url,
				success: function(data) {
					gw2w.items.details = data;
					gw2w.process.itemDetails();
				}
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
		},
		itemPage: function(name) {
			var url = gw2w.api.itemPage(name);
			
			$.ajax({
				dataType: "html",
				url: "get.php",
				data: "url=" + url,
				success: function(data) {
					gw2w.items.page = data;
					gw2w.process.itemPage();
				}
			});
		}
	},
	
	process: {
		armors: function() {
			var vm = gw2w.vm;
			var armors = gw2w.items.armors.results;
			
			$.each(armors, function(index, obj) {
				// Only proceed to add it if the item can be found
				var imgSubdomain = obj.img.split(".")[0].split("//")[1];
				
				// "render" is the new subdomain for image rendering.
				// The old one is not working, but some items still use it.
				if(imgSubdomain == "render") {
					var i = obj.sub_type_id;
					
					// Lets organize the armor types.
					// We place the object into a multidimentional array.
					vm.armors()[i].value.push(new gw2w.class.armor(obj));
				}
			});
		},
		weapons: function() {
			var vm = gw2w.vm;
			var weapons = gw2w.items.weapons.results;
			
			$.each(weapons, function(index, obj) {
				// Only proceed to add it if the item can be found
				var imgSubdomain = obj.img.split(".")[0].split("//")[1];
				
				// "render" is the new subdomain for image rendering.
				// The old one is not working, but some items still use it.
				if(imgSubdomain == "render") {
					var i = obj.sub_type_id;
					
					// Lets organize the weapon types.
					// We place the object into a multidimentional array.
					vm.weapons()[i].value.push(new gw2w.class.weapon(obj));
				}
			});
			
			// Because of missing subtypes, we have some null values in the weapons array.
			// Lets remove those empty values!
			vm.weapons.remove(function(item) {
				return typeof(item) != "object";
			});
			
			// Also, let's remove some of the bullshit subtypes.
			// To make it simple, we remove those that have less than 10 items in them.
			vm.weapons.remove(function(item) {
				return item.value.length < 10;
			});
			
			// And lastly, let's sort them alphabetically
			vm.weapons.sort(function(left, right) {
				return left.id == right.id ? 0 : (left.id < right.id ? -1 : 1);
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
				vm.armors()[obj.id] = {"id": gw2w.general.unspacify(obj.name), "name": obj.name, "arrow": gw2w.items.arrow, "value": new Array()};
			});
			$.each(weaponSubtypes, function(index, obj) {
				//vm.weapons()[obj.id] = {"name": obj.name, "value": ko.observableArray()};
				vm.weapons()[obj.id] = {"id": gw2w.general.unspacify(obj.name), "name": obj.name, "arrow": gw2w.items.arrow, "value": new Array()};
			});
		},
		itemDetails: function() {
			var vm = gw2w.vm;
			var details = gw2w.items.details;
			
			// Clear the variables
			gw2w.clear();
			
			// Check if this guy already exists in the tracker
			gw2w.tracker.exist(details.item_id);
			
			// Fetch item details from the official wiki
			gw2w.populate.itemPage(details.name);
			
			// Give the variables some data
			vm.detailEmpty(false);
			vm.detailId(details.item_id);
			vm.detailName(details.name);
			vm.detailDesc(details.description);
			vm.detailIcon(gw2w.api.render(details.icon_file_signature, details.icon_file_id));
			vm.detailImage();
			vm.detailPage(gw2w.api.itemPage(details.name));
//			vm.detailAcquire(); // Done automagically
//			vm.detailRecipe();	// Done automagically
		},
		itemPage: function() {
			var vm = gw2w.vm;
			var page = gw2w.items.page;
			
			// If successful
			if(page) {
				// Convert the page contents from a string to elements
				page = $(page);
				
				// Locate the content about acquisition
				var acq = $("#Acquisition", page);
				
				// If the page has a section about acquisition
				if(acq.length > 0) {
					// Find the text about how to acquire
					acq = $(acq).parent().next();
					
					// Convert from jQuery element to pure JS to new String
					acq = $(acq)[0].outerHTML;
					
					var vm = gw2w.vm;
					vm.detailAcquire(acq);
					
					// This means there's no recipe
					vm.detailRecipe(false);
				}
				
				// If not
				else {
					// Locate the recipe
					var recipe = $("#Recipe, #Recipes", page);
					
					// If there is a recipe
					if(recipe.length > 0) {
						// Set recipe to true
						vm.detailRecipe(true);
					}
					// Or if there isn't one
					else {
						vm.detailRecipe(false);
					}
				}
			}
			
			// Error handling, if target page does not exist
			else {
				
			}
		}
	},
	
	tracker: {
		add: function() {
			var vm = gw2w.vm;
			
			// Creating the object
			var obj = {
				id: vm.detailId(),
				name: vm.detailName(),
				icon: vm.detailIcon()
			}
			
			// Add the stuff
			vm.tracker.push(new gw2w.class.trackerItem(obj));
			
			// Update localStorage
			gw2w.storage.set();
		},
		remove: function(obj) {
			var vm = gw2w.vm;
			
			vm.tracker.remove(function(item) {
				return item.id === obj.id;
			});
			
			// Lets check again if the currently displayed item exists in the tracker
			gw2w.tracker.exist(vm.detailId());
			
			// Update localStorage
			gw2w.storage.set();
		},
		click: function(obj) {
			// If the item is not the same as the  currently displayed item
			if(obj.id != gw2w.vm.detailId()) {
				gw2w.populate.itemDetails(obj.id);
			}
		},
		exist: function(id) {
			var vm = gw2w.vm;
			// If already exist
			var alreadyExist = false;
			
			// Loop through every item
			$(vm.tracker()).each(function() {
				if(this.id == id) {
					alreadyExist = true;
				}
			});
			
			// Setting global variable
			vm.trackerAvailable(!alreadyExist);
		}
	},
	
	storage: {
		get: function() {
			var vm = gw2w.vm;
			
			// Let's get our hands on some sweet storage
			var tracker = JSON.parse(localStorage.getItem("tracker"));
			
			// Making sure it's there
			if(tracker) {
				// Now lets put this shit into the tracker array
				$(tracker).each(function() {
					vm.tracker.push(new gw2w.class.trackerItem(this));
				});
			}
		},
		set: function() {
			var vm = gw2w.vm;
			var tracker = vm.tracker();
			
			// Now, let's save it
			localStorage.setItem("tracker", JSON.stringify(tracker));
		},
		clear: function() {
			// For some reason I felt that this function was needed
			localStorage.clear();
		}
	},
	
	items: {
		details: null,
		page: null,
		raw: null,
		types: null,
		armors: null,
		weapons: null,
		arrow: "<span class='collapse-arrow pull-right'>&#x25B2;</span>"
	},
	
	update: function() {
		gw2w.vm.armors.push();
		gw2w.vm.weapons.push();
	},
	
	clear: function() {
		var vm = gw2w.vm;
		
		// Clear the variables
		vm.detailEmpty(true);
		vm.detailId(null);
		vm.detailName(null);
		vm.detailDesc(null);
		vm.detailIcon(null);
		vm.detailImage(null);
		vm.detailPage(null);
		vm.detailAcquire(null);
		vm.detailRecipe(false);
	},
	
	loading: function(state) {
		var vm = gw2w.vm;
		
		switch(state) {
			// Lets turn on loading
			case true:
				vm.loading(true);
				break;
			
			// Lets turn off loading
			case false:
				vm.loading(false);
				break;
			
			// Error, unexpected parameter
			default:
				
				break;
		}
	},
	
	plugins: {
		tooltip: function() {
			$.gw2tooltip('[data-gw2item]');
		}
	},
	
	collapse: {
		toggle: function() {
			
		}
	}
}
































