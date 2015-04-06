$(document).ready(function() {
	wardrobe.nav.makeSlideable();
	wardrobe.nav.makeCollapsible();
	wardrobe.nav.scrollspy();
	wardrobe.nav.pushpin();
	
	wardrobe.tooltip.init();
	
	wardrobe.copy.init();
	
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
			$('.tooltipped').tooltip({delay: 0});
		}
	},
	
	toast: function(message, duration) {
		var dur = (duration) ? duration : 2000;
		toast(message, dur);
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
	
	copy: {
		activeId: 0,
		init: function() {
			wardrobe.copy.listener()
//			wardrobe.copy.clipboard();
//			wardrobe.copy.fixHover();
		},
		
		listener: function() {
			$(".linkChatCode").on("click", function(e) {
				var code = chatcode(this);
				var name = $(this).data("itemname");
				var placeholder = "Chat code";
				
				wardrobe.modal({
					title: name,
					inputValue: code,
					placeholder: placeholder
				});
				
				$("#modal-input").blur();
				$("#modal-input")[0].focus();
				$("#modal-input")[0].select();
			});
		},
		
		clipboard: function() {
			var client = new ZeroClipboard($(".linkChatCode"));

			client.on("ready", function(readyEvent) {
				client.on("copy", function(event) {
					var code = chatcode(event.target);
					event.clipboardData.setData("text/plain", code);
				});
			});
		},
		
		fixHover: function() {
			$(".skin-item").on("hover", function() {
				wardrobe.copy.activeId = $(this).data("id");
			});
			
			$("#global-zeroclipboard-html-bridge").hover(function() {
				$('div[data-id="' + wardrobe.copy.activeId + '"]').addClass("zeroclipboard-is-hover");
			}, function() {
				$('div[data-id="' + wardrobe.copy.activeId + '"]').removeClass("zeroclipboard-is-hover");
			});
		}
	},
	
	modal: function(options) {
		var modal = $("#modal");
		modal.find(".modal-header").html(options.title);
		modal.find(".modal-text").html(options.message);
		modal.find(".modal-input").attr("value", options.inputValue);
		modal.find(".modal-input").attr("placeholder", options.placeholder);
		modal.find(".modal-input-placeholder").html(options.placeholder);
		
		modal.openModal();
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