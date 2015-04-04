$(document).ready(function() {
	$(".linkAddToWardrobe").on("click", function(e) {
		e.preventDefault();
		addClick(this);
	});
});

function addClick(el) {
	var ownedClass = "owned";
	var owned = $(el).hasClass(ownedClass);
	
	var skinid = $(el).data("skinid");
	
	if(!owned) {
		// Let's add current skin to user wardrobe.
		// First update the class
		updateClass(el, true, ownedClass);
		
		// Then, let's update the database
		ajaxCall(skinid, true);
	} else {
		// Let's remove current skin from favorites.
		// First update the class
		updateClass(el, false, ownedClass);
		
		// Then, let's update the database
		ajaxCall(skinid, false);
	}
}

function updateClass(el, owned, ownedClass) {
	if(owned) {
		$(el).addClass(ownedClass);
	} else {
		$(el).removeClass(ownedClass);
	}
}

function ajaxCall(skinid, val) {
	$.ajax({
		type: "POST",
		url: "/skin/" + skinid + "/owned",
		data: {
			"skinid": skinid,
			"owned": val
		}
	});
}