<?php
	$url = $_GET['url'];
	
	function valid($text) {
		return preg_match("~^(https?:\/\/)?(wiki\.)?guildwars2\.com\/?~", $text);
	}

	// WARNING: You REALLY should write something to whitelist or otherwise limit what the function will accept, or it could be a security danger to your server (people could read any file).
	if(valid($url)) {
    	$content = @file_get_contents($url);
		
		if($content === false) {
			// Error
			echo null;
		}
		else {
			// Success
			echo $content;
		}
		
	}
?>