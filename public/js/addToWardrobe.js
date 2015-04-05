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
	var skinname = $(el).data("skinname");
	
	if(!owned) {
		// Let's add current skin to user wardrobe.
		// First update the class
		updateClass(el, true, ownedClass, skinid);
		
		// Show toast
		wardrobe.toast(skinname + " added to wardrobe.");
		
		// Then, let's update the database
		ajaxCall(skinid, true);
	} else {
		// Let's remove current skin from favorites.
		// First update the class
		updateClass(el, false, ownedClass, skinid);
		
		// Show toast
		wardrobe.toast(skinname + " removed from wardrobe.");
		
		// Then, let's update the database
		ajaxCall(skinid, false);
	}
}

function updateClass(el, owned, ownedClass, skinid) {
	if(owned) {
		$(el).addClass(ownedClass);
		$("div[data-skinid=" + skinid + "]").addClass(ownedClass);
	} else {
		$(el).removeClass(ownedClass);
		$("div[data-skinid=" + skinid + "]").removeClass(ownedClass);
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