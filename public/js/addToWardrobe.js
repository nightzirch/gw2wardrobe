$(document).ready(function() {
	$(".linkAddToWardrobe").on("click", function(e) {
		e.preventDefault();
		addClick(this);
	});
});

function addClick(el) {
	var ownedClass = "owned";
	var owned = $(el).hasClass(ownedClass);
	
	var itemid = $(el).data("itemid");
	var itemname = $(el).data("itemname");
	
	if(!owned) {
		// Let's add current skin to user wardrobe.
		// First update the class
		updateClass(el, true, ownedClass, itemid);
		
		// Show toast
		wardrobe.toast(itemname + " added to wardrobe.");
		
		// Then, let's update the database
		ajaxCallWardrobe(itemid, true);
	} else {
		// Let's remove current skin from favorites.
		// First update the class
		updateClass(el, false, ownedClass, itemid);
		
		// Show toast
		wardrobe.toast(itemname + " removed from wardrobe.");
		
		// Then, let's update the database
		ajaxCallWardrobe(itemid, false);
	}
}

function updateClass(el, owned, ownedClass, itemid) {
	if(owned) {
		$(el).addClass(ownedClass);
		$("div[data-itemid=" + itemid + "]").addClass(ownedClass);
	} else {
		$(el).removeClass(ownedClass);
		$("div[data-itemid=" + itemid + "]").removeClass(ownedClass);
	}
}

function ajaxCallWardrobe(itemid, val) {
	$.ajax({
		type: "POST",
		url: "/skin/" + itemid + "/owned",
		data: {
			"itemid": itemid,
			"owned": val
		}
	});
}