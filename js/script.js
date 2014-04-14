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
		
		// Do the ajax calls
		gw2w.ajax.exec();
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
		
		// Search
		self.search = ko.observable(undefined);
		
		// Item details
		self.detailEmpty = ko.observable(true);
		self.detailId = ko.observable(null);
		self.detailCode = ko.observable(null);
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
		self.trackerCode = ko.computed(function() {
			var tracker = self.tracker();
			var codes = new Array();
			
			$(tracker).each(function() {
				codes.push(gw2w.general.encodeId(this.id));
			});
			
			return codes.join("");
		});
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
			self.visible = ko.observable(true);
		},		
		// Class to represent a weapon item
		weapon: function(obj) {
			var self = this;
			self.id = obj.data_id;
			self.name = obj.name;
			self.img = obj.img;
			self.type = obj.type_id;
			self.subType = obj.sub_type_id;
			self.visible = ko.observable(true);
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
		},
		wiki: function() {
			return "http://wiki.guildwars2.com";
		}
	},
	
	general: {
		unspacify: function(str) {
			return str.split(" ").join("");
		},
		replace: function(find, replace, str) {
			return str.replace(new RegExp(find, 'g'), replace);
		},
		copy: function(text) {
			
		},
		BEtoLE: function(be) {
			// Thanks to ArenaNet for creating this!
			var le = String.fromCharCode(be.charCodeAt(0) & 255) + String.fromCharCode(be.charCodeAt(0) >> 8);
			return le;
		},
		encodeId: function(id) {
			// First off, let's declare our favorite object, Base64!
			// Thanks to ArenaNet for creating this!
			var Base64 = {
				// private property
				_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
				
				// public method for encoding
				encode: function (input) {
					var output = "";
					var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
					var i = 0;
					
					while (i < input.length) {
						chr1 = input.charCodeAt(i++);
						chr2 = input.charCodeAt(i++);
						chr3 = input.charCodeAt(i++);
						
						enc1 = chr1 >> 2;
						enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
						enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
						enc4 = chr3 & 63;
						
						if (isNaN(chr2)) {
							enc3 = enc4 = 64;
						}
						else if (isNaN(chr3)) {
							enc4 = 64;
						}
						
						output = output +
						this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
						this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
					}
					
					return output;
				}
			}
			
			
			// Since this site will only work with items, we can hard code the type
			var type = "2";
			
			// Thanks to ArenaNet for doing the magic!
			if (type.toString().match(/(1|2|4|7|8|10)/)) {
				var typeId = String.fromCharCode(type);
				
				if (type == 2)
					typeId += String.fromCharCode(1);
				
				id = gw2w.general.BEtoLE(String.fromCharCode(parseInt(id)));
				var pad = String.fromCharCode(0) + String.fromCharCode(0);
				var chatLink = "[&" + Base64.encode(typeId + id + pad) + "]";
				
				return chatLink;
			}
			else {
				// Unknown item type
				return null;
			}
		}
	},
	
	ajax: {
		done: function() {
			// Stop loading
			gw2w.loading(false),
				
			// Update
			gw2w.update();
			
			// Storage
			gw2w.storage.tracker.get();
			
			// Plugins
			gw2w.plugins.tooltip();
			$('.gw2tooltip').tooltip()
			
			// Listeners
			gw2w.listeners.all();
			
			console.log("Stuff is ready. Let's make this page happen.");
		},
		exec: function() {
			// First we see if everything is in the localStorage
			var arraysExist = gw2w.storage.get();
			
			// So, they exist in the storage. Now we dont have to do ajax calls and process the data. That's good!
			if(arraysExist) {
				// We're done!
				gw2w.ajax.done();
			}
			// Uh oh, they didn't exist. Gotta do dem ajax calls. Oh dear, god! THE PERFORMANCE LOSS!
			else {
				console.log("Data not found in localStorage. Downloading and processing...");
				
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
					// Let's store the arrays in localStorage
					gw2w.storage.set();
					
					// Soon done!
					gw2w.ajax.done();
				});
			}
		}
	},
	
	listeners: {
		all: function() {
			gw2w.listeners.itemBlock();
			gw2w.listeners.search();
			gw2w.listeners.searchClear();
			gw2w.listeners.trackerAdd();
			gw2w.listeners.collapseToggle();
			gw2w.listeners.linkCode();
			gw2w.listeners.linkCodeAll();
		},
		itemBlock: function() {
			$(".itemBlock").on("click", function() {
				var id = $(this).attr("data-gw2item");
				gw2w.populate.itemDetails(id);
			});
		},
		search: function() {
			$("#search form").on("submit", function(e) {
				e.preventDefault();
				gw2w.process.search();
			});
			
			$("#search form").on("focusout", function(e) {
				gw2w.process.search();
			});
		},
		searchClear: function() {
			$("#clearSearch").on("click", function(e) {
				gw2w.vm.search(undefined);
				gw2w.process.search();
				//$("#inputSearch").blur();	// Won't work for some reason
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
		},
		linkCode: function() {
			var vm = gw2w.vm;
			var self = $(".detailCode");
			
			// Create a tooltip when copied
			$(self).tooltip({
				title: "Copied",
				placement: "top",
				trigger: 'manual'
			});
			
			// Create the copy client
			var detailClient = new ZeroClipboard(self, {
				moviePath: "includes/ZeroClipboard.swf",
				forceHandCursor: true,
				debug: false
			});
			
			// Event that triggers when tries to copy
			detailClient.on('dataRequested', function (client, args) {
				// Let's put something in the console
				console.log("The code for " + vm.detailName() + " was copied to clipboard.");
				
				// Show the tooltip
				$(self).tooltip("show");
				
				// Hide the tooltip
				setTimeout(function() {
					$(self).tooltip("hide");
				}, 1000);
			});
		},
		linkCodeAll: function() {
			var vm = gw2w.vm;
			var self = $("#trackerCopy");
			
			// Create a tooltip when copied
			$(self).tooltip({
				title: "Copied",
				placement: "top",
				trigger: 'manual'
			});
			
			// Create the copy client
			var allClient = new ZeroClipboard(self, {
				moviePath: "includes/ZeroClipboard.swf",
				forceHandCursor: true,
				debug: false
			});
			
			// Event that triggers when tries to copy
			allClient.on('dataRequested', function (client, args) {
				// Tracker names
				var vm = gw2w.vm;
				var names = new Array();
				var tracker = vm.tracker();
				$(tracker).each(function() {
					names.push(this.name);
				});
				
				// If there are more than one item in the tracker
				if(names.length > 1) {
					// Combining the two last elements in the array, adding "and" between them and removing the last item
					names[names.length-2] = names[names.length-2] + " and " + names[names.length-1];
					names.pop();
				}
				
				// Adding comma between
				names = names.join(", ");
				
				// Let's put something in the console
				if(tracker.length > 1) {
					console.log("The codes for " + names + " was copied to clipboard.");
				}
				else if(tracker.length == 1) {
					console.log("The code for " + names + " was copied to clipboard.");
				}
				
				// Show the tooltip
				$(self).tooltip("show");
				
				// Hide the tooltip
				setTimeout(function() {
					$(self).tooltip("hide");
				}, 1000);
			});
		}
	},
	
	populate: {
		items: function() {
			var url = gw2w.api.items();
			
			$.ajax({
				dataType: "json",
				url: url,
				success: function(data) {
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
				return item.value().length < 10;
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
				vm.armors()[obj.id] = {
					"id": gw2w.general.unspacify(obj.name),
					"name": obj.name,
					"arrow": gw2w.items.arrow,
					"size": ko.observable(null),
					"value": ko.observableArray()
				};
			});
			$.each(weaponSubtypes, function(index, obj) {
				//vm.weapons()[obj.id] = {"name": obj.name, "value": ko.observableArray()};
				vm.weapons()[obj.id] = {
					"id": gw2w.general.unspacify(obj.name),
					"name": obj.name,
					"arrow": gw2w.items.arrow,
					"size": ko.observable(null),
					"value": ko.observableArray()
				};
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
			vm.detailCode(gw2w.general.encodeId(details.item_id));
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
				
				// Fix all the paths
				$("a, img", page).each(function() {
					// Fetch the href or src.
					// Let's find out if it's an <a> or <img>
					var tag = $(this)[0].tagName;
					var path = (tag == "A") ? $(this).attr("href") : $(this).attr("src");
					
					// Making sure path has a value
					if(path) {
						// Check if the path is relative or absolute
						if(path.match("http")) {
							// Absolute path. No need to fix
							// Do nothing
						}
						else {
							// Relative path. Fix!
							if(tag == "A") {
								$(this).attr("href", gw2w.api.wiki() + path);
							}
							else {
								$(this).attr("src", gw2w.api.wiki() + path);
							}
						}
					}
				});
				
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
				// I dont know what to do :(
			}
		},
		search: function() {
			var vm = gw2w.vm;
			var armors = vm.armors();
			var weapons = vm.weapons();
			var search = new RegExp(vm.search(), "i");
			
			// Each armor type
			$(armors).each(function() {
				// Counter for armor.size
				var counter = 0;
				
				// Each armor item
				$(this.value()).each(function() {
					if(search.exec(this.name)) {
						this.visible(true);
						counter++;
					}
					else {
						this.visible(false);
					}
				});
				
				// Setting this.size to null if counter == value().length
				if(counter == this.value().length) {
					this.size(null);
				}
				// If it's not, then we want to show the number of visible items
				else {
					this.size(counter);
				}
			});
			
			// Each weapon type
			$(weapons).each(function() {
				// Counter for weapon.size
				var counter = 0;
				
				// Each weapon item
				$(this.value()).each(function() {
					if(search.exec(this.name)) {
						this.visible(true);
						counter++;
					}
					else {
						this.visible(false);
					}
				});
				
				// Setting this.size to null if counter == value().length
				if(counter == this.value().length) {
					this.size(null);
				}
				// If it's not, then we want to show the number of visible items
				else {
					this.size(counter);
				}
			});
			
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
			gw2w.storage.tracker.set();
		},
		remove: function(obj) {
			var vm = gw2w.vm;
			
			vm.tracker.remove(function(item) {
				return item.id === obj.id;
			});
			
			// Lets check again if the currently displayed item exists in the tracker
			gw2w.tracker.exist(vm.detailId());
			
			// Update localStorage
			gw2w.storage.tracker.set();
		},
		click: function(obj) {
			// If the item is not the same as the  currently displayed item
			if(obj.id != gw2w.vm.detailId()) {
				gw2w.populate.itemDetails(obj.id);
			}
		},
		clear: function() {
			var vm = gw2w.vm;
			
			// Clear
			vm.tracker.removeAll();
			
			// Update localStorage
			gw2w.storage.tracker.set();
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
			var armors = gw2w.storage.armors.get();
			var weapons = gw2w.storage.weapons.get();
			
			// If all exist, we return true. If not, we return false
			if(armors && weapons) {
				return true;
			}
			else {
				return false;
			}
		},
		set: function() {
			// Lets set all the storage values
			gw2w.storage.armors.set();
			gw2w.storage.weapons.set();
		},
		armors: {
			name: "armors",
			get: function() {
				var vm = gw2w.vm;
				
				// Let's get our hands on some sweet storage
				var name = gw2w.storage.armors.name;
				var armors = JSON.parse(localStorage.getItem(name));
				
				// Making sure it's there
				if(armors) {
					console.log("Data found in localStorage. Extracting...");
					
					// Knockout functions are not created from JSON.parse, so we gotta create those manually
					$(armors).each(function() {
						this.size = ko.observable(this.size);
						this.value = ko.observableArray(this.value);
						
						$(this.value()).each(function() {
							this.visible = ko.observable(true);
						});
					});
					
					// Now lets make this shit the new armors array
					vm.armors(armors);
					
					// And lets also return true, so we know some shit went down here!
					return true;
				}
				// If it's not there...
				else {
					return false;
				}
			},
			set: function() {
				var vm = gw2w.vm;
				var armors = vm.armors();
				var name = gw2w.storage.armors.name;
				
				// Now, let's save it
				localStorage.setItem(name, ko.toJSON(armors));
			},
			clear: function() {
				// Will remove only the armors
				var name = gw2w.storage.armors.name;
				localStorage.removeItem(name);
			}
		},
		weapons: {
			name: "weapons",
			get: function() {
				var vm = gw2w.vm;
				
				// Let's get our hands on some sweet storage
				var name = gw2w.storage.weapons.name;
				var weapons = JSON.parse(localStorage.getItem(name));
				
				// Making sure it's there
				if(weapons) {
					// Knockout functions are not created from JSON.parse, so we gotta create those manually
					$(weapons).each(function() {
						this.size = ko.observable(this.size);
						this.value = ko.observableArray(this.value);
						
						$(this.value()).each(function() {
							this.visible = ko.observable(true);
						});
					});
					
					// Now lets make this shit the new weapons array
					vm.weapons(weapons);
					
					// And lets also return true, so we know some shit went down here!
					return true;
				}
				// If it's not there...
				else {
					return false;
				}
			},
			set: function() {
				var vm = gw2w.vm;
				var weapons = vm.weapons();
				var name = gw2w.storage.weapons.name;
				
				// Now, let's save it
				localStorage.setItem(name, ko.toJSON(weapons));
			},
			clear: function() {
				// Will remove only the weapons
				var name = gw2w.storage.weapons.name;
				localStorage.removeItem(name);
			}
		},
		tracker: {
			name: "tracker",
			get: function() {
				var vm = gw2w.vm;
				
				// Let's get our hands on some sweet storage
				var name = gw2w.storage.tracker.name;
				var tracker = JSON.parse(localStorage.getItem(name));
				
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
				var name = gw2w.storage.tracker.name;
				
				// Now, let's save it
				localStorage.setItem(name, JSON.stringify(tracker));
			},
			clear: function() {
				// Will remove only the tracker
				var name = gw2w.storage.tracker.name;
				localStorage.removeItem(name);
			}
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
		vm.detailCode(null);
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
































