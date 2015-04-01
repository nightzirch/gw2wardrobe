$(document).ready(function() {
	$("#profile-save").on("click", function() {
		console.log("click");
		$("#submit").trigger("click");
	});
});