$(document).ready(function() {
	$(".linkFavorite").on("click", function(e) {
		e.preventDefault();
		favoriteClick(this);
	});
});

function favoriteClick(el) {
	var favoriteClass = "favoritted";
	var favoritted = $(el).hasClass(favoriteClass);
	
	var skinid = $(el).data("skinid");
	
	if(!favoritted) {
		// Let's add current skin to favorites.
		// First update the class
		updateClass(el, true, favoriteClass);
		
		// Then, lets update the badge number
		updateBadge(true);
		
		// Then, let's update the database
		ajaxCall(skinid, true);
	} else {
		// Let's remove current skin from favorites.
		// First update the class
		updateClass(el, false, favoriteClass);
		
		// Then, lets update the badge number
		updateBadge(false);
		
		// Then, let's update the database
		ajaxCall(skinid, false);
	}
}

function updateClass(el, makeFavorite, favoriteClass) {
	if(makeFavorite) {
		$(el).addClass(favoriteClass);
	} else {
		$(el).removeClass(favoriteClass);
	}
}

function ajaxCall(skinid, val) {
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