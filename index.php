<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Guild Wars 2 Wardrobe</title>
		
		<!-- Bootstrap -->
		<link href="css/bootstrap.min.css" rel="stylesheet">
		
		<!-- Custom style -->
		<link href="css/style.css" rel="stylesheet">
		<link href="js/theme/default/guildwars2-tooltip.css" rel="stylesheet">
		
		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	
	<body>
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-2">
					<div id="sortMenu" class="panel-group">
						<div class="panel panel-default">
							<div class="panel-heading">
								<a href="#sortArmor" data-toggle="collapse" data-parent="#sortMenu">
									Armor Skins
									<span class="collapse-arrow span-right">&#x25B2;</span>
								</a>
							</div>
							
							<ul id="sortArmor" class="list-group collapse in">
								<li class="list-group-item">All weights</li>
								<li class="list-group-item">Light</li>
								<li class="list-group-item">Medium</li>
								<li class="list-group-item">Heavy</li>
							</ul>
						</div>
						
						<div class="panel panel-default">
							<div class="panel-heading">
								<a href="#sortWeapon" class="collapsed" data-toggle="collapse" data-parent="#sortMenu">
									Weapon Skins
									<span class="collapse-arrow span-right">&#x25B2;</span>
								</a>
							</div>
							
							<ul id="sortWeapon" class="list-group collapse">
								<li class="list-group-item">Axe</li>
								<li class="list-group-item">Dagger</li>
								<li class="list-group-item">Focus</li>
								<li class="list-group-item">Greatsword</li>
								<li class="list-group-item">Hammer</li>
								<li class="list-group-item">Harpoon Gun</li>
								<li class="list-group-item">Longbow</li>
								<li class="list-group-item">Mace</li>
								<li class="list-group-item">Pistol</li>
								<li class="list-group-item">Rifle</li>
								<li class="list-group-item">Scepter</li>
								<li class="list-group-item">Shield</li>
								<li class="list-group-item">Short Bow</li>
								<li class="list-group-item">Spear</li>
								<li class="list-group-item">Staff</li>
								<li class="list-group-item">Sword</li>
								<li class="list-group-item">Torch</li>
								<li class="list-group-item">Trident</li>
								<li class="list-group-item">Warhorn</li>
							</ul>
						</div>
						
						<div class="panel panel-default">
							<div class="panel-heading">
								<a href="#sortOutfit" class="collapsed" data-toggle="collapse" data-parent="#sortMenu">
									Outfits
									<span class="collapse-arrow span-right">&#x25B2;</span>
								</a>
							</div>
							
							<ul id="sortOutfit" class="list-group collapse">
								<li class="list-group-item">All weights</li>
								<li class="list-group-item">Light</li>
								<li class="list-group-item">Medium</li>
								<li class="list-group-item">Heavy</li>
							</ul>
						</div>
					</div>
				</div>
				
				<div class="col-md-8">
					<div id="itemsContainer" class="panel-group" data-bind="foreach: armors">
						
						<div class="panel panel-default">
							<div class="panel-heading">
								<a href="#lightChest" data-toggle="collapse" data-parent="#itemsContainer" data-bind="text: name">
									<span class="collapse-arrow span-right">&#x25B2;</span>
								</a>
							</div>
							
							<!--<div id="lightChest" class="panel-collapse collapse in">
								<div class="panel-body" data-bind="foreach: armors">
									<div class="itemBlock" data-bind='attr: {"data-gw2item": id}'>
										<img data-bind="attr: {src: img}" />
									</div>
								</div>
							</div>-->
						</div>
						
						
						
						
					</div>
				</div>
				<div class="col-md-2">
				
				</div>
			</div>
		</div>
		
		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<!-- Include all compiled plugins (below), or include individual files as needed -->
		<script src="js/bootstrap.min.js"></script>
		<!-- Knockout JS -->
		<script src="js/knockout-3.1.0.js"></script>
		<!-- Custom Script -->
		<script src="js/guildwars2-tooltip.jquery.min.js"></script>
		<script src="js/script.js"></script>
		
		
	</body>
</html>