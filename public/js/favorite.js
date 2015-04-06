$(document).ready(function() {
	$(".linkFavorite").on("click", function(e) {
		e.preventDefault();
		favoriteClick(this);
	});
});

function favoriteClick(el) {
	var favoriteClass = "favoritted";
	var favoritted = $(el).hasClass(favoriteClass);
	
	var skinid = $(el).data("itemid");
	var skinname = $(el).data("itemname");
	
	if(!favoritted) {
		// Let's add current skin to favorites.
		// First update the class
		updateClass(el, true, favoriteClass, skinid);
		
		// Then, lets update the badge number
		updateBadge(true);
		
		// Show toast
		wardrobe.toast(skinname + " added to favorites.");
		
		// Then, let's update the database
		ajaxCallFavorite(skinid, true);
	} else {
		// Let's remove current skin from favorites.
		// First update the class
		updateClass(el, false, favoriteClass, skinid);
		
		// Then, lets update the badge number
		updateBadge(false);
		
		// Show toast
		wardrobe.toast(skinname + " removed from favorites.");
		
		// Then, let's update the database
		ajaxCallFavorite(skinid, false);
	}
}

function updateClass(el, makeFavorite, favoriteClass, skinid) {
	if(makeFavorite) {
		$(el).addClass(favoriteClass);
		$("div[data-itemid=" + skinid + "]").addClass(favoriteClass);
	} else {
		$(el).removeClass(favoriteClass);
		$("div[data-itemid=" + skinid + "]").removeClass(favoriteClass);
	}
}

function ajaxCallFavorite(skinid, val) {
	$.ajax({
		type: "POST",
		url: "/skin/" + skinid + "/favorite",
		data: {
			"skinid": skinid,
			"favorite": val
		}
	});
}

function updateBadge(increase) {
	var badge = $("#badge-favorites");
	var number = parseInt($(badge).html());
	
	if(increase) {
		if(number == 0) {
			$(badge).removeClass("hidden");
		}
		
		number++;
		$(badge).html(number);
	} else {
		number--
		$(badge).html(number);
		
		if(number == 0) {
			$(badge).addClass("hidden");
		}
	}
}