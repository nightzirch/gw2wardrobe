$(document).ready(function() {
	$(".linkFavorite").on("click", function(e) {
		e.preventDefault();
		favoriteClick(this);
	});
});

function favoriteClick(el) {
	var favoriteClass = "favoritted";
	var favoritted = $(el).hasClass(favoriteClass);
	
	var itemid = $(el).data("itemid");
	var itemname = $(el).data("itemname");
	
	if(!favoritted) {
		// Let's add current skin to favorites.
		// First update the class
		updateClass(el, true, favoriteClass, itemid);
		
		// Then, lets update the badge number
		updateBadge(true);
		
		// Show toast
		wardrobe.toast(itemname + " added to favorites.");
		
		// Then, let's update the database
		ajaxCallFavorite(itemid, true);
	} else {
		// Let's remove current skin from favorites.
		// First update the class
		updateClass(el, false, favoriteClass, itemid);
		
		// Then, lets update the badge number
		updateBadge(false);
		
		// Show toast
		wardrobe.toast(itemname + " removed from favorites.");
		
		// Then, let's update the database
		ajaxCallFavorite(itemid, false);
	}
}

function updateClass(el, makeFavorite, favoriteClass, itemid) {
	if(makeFavorite) {
		$(el).addClass(favoriteClass);
		$("div[data-itemid=" + itemid + "]").addClass(favoriteClass);
	} else {
		$(el).removeClass(favoriteClass);
		$("div[data-itemid=" + itemid + "]").removeClass(favoriteClass);
	}
}

function ajaxCallFavorite(itemid, val) {
	$.ajax({
		type: "POST",
		url: "/skin/" + itemid + "/favorite",
		data: {
			"itemid": itemid,
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