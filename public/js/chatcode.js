$(document).ready(function() {
	$(".linkChatCode").on("click", function(e) {
		e.preventDefault();
	});
});

function chatcode(el) {
	var id = $(el).data("itemid");
	var type = $(el).data("type");
	
	var chatcode = encodeChatLink(type, id);
	
	return chatcode;
}

function encodeChatLink(type, id) {
	var linkTypes = { item: 2, text: 3, map: 4, skill: 7, trait: 8, recipe: 10, skin: 11, outfit: 12 };
	
	if (!type) {
		console.log("Type: " + type);
		return 'invalid type';
	}
	type = linkTypes[type.trim().toLowerCase()] || 0;
	if (!type) {
		return 'invalid type';
	}

	var data = [];
	while (id > 0) {
		data.push(id & 255);
		id = id >> 8;
	}
	while (data.length < 4 || data.length % 2 != 0) {
		data.push(0);
	}

	if (type == 2) {
		data.unshift(1);
	}
	data.unshift(type);

	// encode data
	var binary = '';
	for (var i = 0; i < data.length; i++) {
		binary += String.fromCharCode(data[i]);
	}
	return '[&' + btoa(binary) + ']';
}