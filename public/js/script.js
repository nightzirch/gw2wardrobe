$(document).ready(function() {
	wardrobe.nav.makeSlideable();
	wardrobe.nav.makeCollapsible();
	wardrobe.nav.scrollspy();
	wardrobe.nav.pushpin();
	
	wardrobe.tooltip.init();
	
	wardrobe.search.listener();
	
	//wardrobe.footer.listener();
	//wardrobe.footer.fixHeight();
	//wardrobe.temp.hideEmpty();
	setTimeout(function() {
		wardrobe.footer.makeSticky();
	}, 300);
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
			var toc = $('.table-of-contents');
			if($(toc).length > 0) {
				$(toc).pushpin({ top: $('.table-of-contents').parent().offset().top });
			}
		}
	},
	
	search: {
		init: function() {
			var search = $("#search").val();
			console.log(search);
			location.pathname = "/search/" + search;
			
			return false;
		},
		listener: function() {
			$("#searchForm").on("submit", function() {
				return false;
			});
		}
	},
	
	tooltip: {
		init: function() {
			$('.tooltipped').tooltip();
		}
	},
	
	// Footer
	footer: {
		listener: function() {
			$(window).resize(function() {
					wardrobe.footer.fixHeight();
					wardrobe.footer.makeSticky();
			});
		},
		fixHeight: function() {
			var wrapper = $("#footer-logo-wrapper");
			if($(window).width() > 975) {
				$(wrapper).height($("#footer-content-wrapper").height());
			}
			else {
				$(wrapper).height("auto");
			}
		},
		makeSticky: function() {
			var pageWrap = $(".page-wrap");
			var footer = $("footer");
			var cssId = "styleHeight";
			var css = $("#" + cssId);
			
			// Set negative margin on the page-wrapper
			$(pageWrap).css("margin-bottom", $(footer).height() * -1);
			
			// Create a new style tag, then remove the old one.
			// This is such a dirty way to do it, but we can't modify pseudo-elements with JavaScript yet, so this is the next best thing, I guess...
			$('<style id="' + cssId + '">.page-wrap:after{height: ' + $(footer).height() + 'px}</style>').appendTo('head');
			$(css).remove();
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