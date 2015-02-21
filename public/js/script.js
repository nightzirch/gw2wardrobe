$(document).ready(function() {
	wardrobe.nav.makeSlideable();
	wardrobe.nav.makeCollapsible();
});

var wardrobe = {
	nav: {
		makeSlideable: function() {
			$("#sidenav-collapse").sideNav();
		},
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
		}
	}
}