$(document).ready(function() {
    $("#profile-update").on("click", function(e) {
		e.preventDefault();
        $.ajax({
        	type: "POST",
        	url: "/profile/updateSkinsUnlocked"
        });

        setTimeout(function() {
            location.reload();
        }, 2000);
	});
})
