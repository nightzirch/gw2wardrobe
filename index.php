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
		<nav class="navbar navbar-default" role="navigation">
			<div class="container-fluid">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#">Guild Wars 2 Wardrobe <span class="badge badge-danger">ALPHA</span></a>
				</div>
				
				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li class="active"><a href="">Wardrobe</a></li>
						<li><a href="about.php">About</a></li>
						<li><a href="changelog.php">Changelog</a></li>
					</ul>
				</div><!-- /.navbar-collapse -->
			</div><!-- /.container-fluid -->
		</nav>
		
		<div class="container-fluid">
			<!-- Danger alert -->
			<div class="alert alert-danger">
				<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
				<h4>Guild Wars 2 Wardrobe is in alpha!</h4>
				Hello and thanks for checking out the site. I would like to inform you that Guild Wars 2 Wardrobe is under development and that there are currently only a few features available. However, feel free to play around. If you want more information about the site, you can read about planned <a class="alert-link" href="features.php">upcoming features</a> or check out <a class="alert-link" href="changelog.php">the changelog</a>.
			</div>
			
			<div class="row">
				<div class="col-md-2">
					<div id="sortMenu" class="panel-group">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h5>
									<a href="#sortArmor" data-toggle="collapse" data-parent="#sortMenu">
										Armor Skins
										<span class="collapse-arrow pull-right">&#x25B2;</span>
									</a>
								</h5>
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
								<h5>
									<a href="#sortWeapon" class="collapsed" data-toggle="collapse" data-parent="#sortMenu">
										Weapon Skins
										<span class="collapse-arrow pull-right">&#x25B2;</span>
									</a>
								</h5>
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
								<h5>
									<a href="#sortOutfit" class="collapsed" data-toggle="collapse" data-parent="#sortMenu">
										Outfits
										<span class="collapse-arrow pull-right">&#x25B2;</span>
									</a>
								</h5>
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
				
				<div class="col-md-7">
					<div id="loading" data-bind="visible: loading">
						<img src="img/loading.gif" alt="Loading" />
					</div>
					
					<div id="itemsContainer" class="panel-group" data-bind="foreach: armors">
						
						<div class="panel panel-default">
							<div class="panel-heading">
								<a data-toggle="collapse" data-bind='html: name + " (" + value.length + ")" + arrow, attr: {href: "#" + id}'></a>
							</div>
							
							<div class="panel-collapse collapse in" data-bind="attr: {id: id}">
								<div class="panel-body" data-bind="foreach: value">
									<div class="itemBlock" data-bind='attr: {"data-gw2item": id}'>
										<img data-bind="attr: {src: img}" />
									</div>
								</div>
							</div>
							
							<!-- ko if: $index() == 0 -->
								<!--<div class="panel-heading">
									<a data-toggle="collapse" data-bind='html: name + arrow, attr: {href: "#" + id}'></a>
								</div>
								
								<div class="panel-collapse collapse in" data-bind="attr: {id: id}">
									<div class="panel-body" data-bind="foreach: value">
										<div class="itemBlock" data-bind='attr: {"data-gw2item": id}'>
											<img data-bind="attr: {src: img}" />
										</div>
									</div>
								</div>-->
							<!-- /ko -->
							
							<!-- ko if: $index() != 0 -->
								<!--<div class="panel-heading">
									<a data-toggle="collapse" class="collapsed" data-bind='html: name + arrow, attr: {href: "#" + id}'></a>
								</div>
								
								<div class="panel-collapse collapse" data-bind="attr: {id: id}">
									<div class="panel-body" data-bind="foreach: value">
										<div class="itemBlock" data-bind='attr: {"data-gw2item": id}'>
											<img data-bind="attr: {src: img}" />
										</div>
									</div>
								</div>-->
							<!-- /ko -->
						</div>
					</div>
				</div>
				<div class="col-md-3">
					<div id="itemDetails">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h5>Item Details</h5>
							</div>
							
							<ul class="list-group" data-bind="visible: detailId">
								<li class="list-group-item">
									<img class="detailIcon pull-left" data-bind="attr: {src: detailIcon}" />
									<h5 class="detailName" data-bind="text: detailName"></h5>
									<p class="detailDesc text-muted" data-bind="text: detailDesc"></p>
								</li>
								
								<li class="list-group-item" data-bind="visible: detailAcquire || detailRecipe">
									<div data-bind="visible: detailAcquire">
										<h5>Acquisition</h5>
										<div data-bind="html: detailAcquire"></div>
									</div>
									
									<div data-bind="visible: detailRecipe">
										<h5>Recipe</h5>
										<div data-bind="html: detailRecipeText"></div>
									</div>
								</li>
							</ul>
							
							<div class="panel-body" data-bind="visible: detailEmpty">
								<p class="text-muted">Click on an item to show details.</p>
							</div>
							
							<div class="panel-footer">
								<button type="button" class="btn btn-primary" id="trackerAdd" data-bind='attr: {"data-id": detailId}, enable: (detailId() && trackerAvailable()), text: trackerAddText'></button>
								<a class="btn btn-default" role="button" data-bind="attr: {href: detailPage}, css: {disabled: detailEmpty}">Official Wiki</a>
								<a class="btn btn-link pull-right" role="button" data-bind="click: gw2w.clear, visible: detailId">Clear</a>
							</div>
						</div>
					</div>
					
					<div id="tracker">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h5>Item Tracker <span class="gw2tooltip glyphicon glyphicon-question-sign" data-toggle="tooltip" data-placement="right" title="The item tracker saves automagically! You can close your browser and everything will still be here."></span></h5>
							</div>
							
							<ul class="list-group" data-bind="foreach: tracker, visible: tracker().length > 0">
								<a href="#" class="trackerItem list-group-item" data-bind='attr: {"data-id": id}, click: gw2w.tracker.click'>
									<button type="button" class="btn btn-danger pull-right" data-bind='click: gw2w.tracker.remove'>Remove</button>
									<img class="trackerIcon pull-left" data-bind="attr: {src: icon}" />
									<p class="trackerName list-group-item-heading" data-bind="text: name"></p>
								</a>
							</ul>
							
							<div class="panel-body" data-bind="visible: tracker().length < 1">
								<p class="text-muted">There are currently no items in the tracker.</p>
							</div>
						</div>
					</div>
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