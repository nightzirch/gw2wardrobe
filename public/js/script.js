$(document).ready(function() {
	wardrobe.nav.makeSlideable();
	wardrobe.nav.makeCollapsible();
	wardrobe.nav.scrollspy();
	wardrobe.nav.pushpin();
	//wardrobe.temp.hideEmpty();
});

var wardrobe = {
	// Navigation
	nav: {
		// Make the navigation on mobile slide in
		makeSlideable: function() {
			$("#sidenav-collapse").sideNav();
		},
		
		// Make Armors and Weapons in the navigation collapsible
		makeCollapsible: function() {
			var collapsibles = $("ul.collapsible");
			for (var i = 0; i < collapsibles.length; i++) {
				var lis = $(collapsibles[i]).find("li");
				for (var y = 0; y < lis.length; y++) {
					if($(lis[y]).hasClass("active")) {
						$(collapsibles[i]).find(".collapsible-body").css("display", "block");
						$(collapsibles[i]).find(".collapsible-body").parent().addClass("active");
					}
				}
			}
		},
		
		// Activate Scrollspy
		scrollspy: function() {
    		$('.scrollspy').scrollSpy();
		},
		
		// Activates Pushpin to make the Scrollspy section fixed on the site
		pushpin: function() {
			$('.table-of-contents').pushpin({ top: $('.table-of-contents').parent().offset().top });
		}
	},
	
	// Temporary functions
	temp: {
		hideEmpty: function() {
			var itemsContainers = $(".categoryContainer .itemsContainer");
			
			for (var i = 0; i < itemsContainers.length; i++) {
				var items = $(itemsContainers[i]).find(".skinItem");
				
				if ($(items).length <= 0) {
					// Category section
					$(itemsContainers[i]).parent().hide();
					
					// ScrollSpy item
					$('.table-of-contents li a[href="#' + $(itemsContainers[i]).parent().attr("id") + '"]').parent().hide();
				}
			}
		}
	}
}