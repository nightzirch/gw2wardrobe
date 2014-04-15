<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>GuildWars2 Wardrobe</title>
		
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
		<?php
			include('includes/header.php');
		?>
		
		<div class="container-fluid">
			<!-- Danger alert -->
			<div class="alert alert-danger">
				<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
				<h4>GuildWars2 Wardrobe is in beta!</h4>
				<p>Hello and thanks for checking out the site. I would like to inform you that GuildWars2 Wardrobe is currently under development and that there are some features available, but there will be more. However, feel free to play around. If you want more information about the site, you can read about upcoming features on the <a class="alert-link" href="/about">about page</a> or check out <a class="alert-link" href="https://github.com/nightzirch/gw2wardrobe/commits/master">the changelog on GitHub</a>.</p>
				<br />
				<p><strong>Important!</strong> Due to the API fetching <em>all</em> armors and weapons compared to only those with a unique skin, the performance will be extremely poor when loading the wardrobe the first time and the first few times you perform a search. After that, the page will still take some time to load, but the load times depends more on your computer's power. After the browser has loaded the wardrobe once, searching performance will be alot better. I am looking into ways to improve performance, but I am first of all focusing on functionality as the ridiculously large array of items is only temporary until ArenaNet updates their API. Then the array will only include unique skins. Thank you for your patience. It is after all a beta release.</p>
			</div>
			
			<div class="row">
				<div class="col-md-2">
					<div id="sortMenu" class="panel-group">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h5>
									<a id="collapseToggle" href="#" >
										Toggle collapse all
									</a>
								</h5>
							</div>
						</div>
						
						<div class="panel panel-default">
							<div class="panel-heading">
								<h5>
									<a href="#sortArmor" data-toggle="collapse" data-parent="#sortMenu">
										Armor Skins
										<span class="collapse-arrow pull-right">&#x25B2;</span>
									</a>
								</h5>
							</div>
							
							<ul id="sortArmor" class="list-group collapse in" data-bind="foreach: armors">
								<li class="list-group-item">
									<a data-bind='attr: {href: "#" + id}, text: name'></a>
								</li>
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
							
							<ul id="sortWeapon" class="list-group collapse" data-bind="foreach: weapons">
								<li class="list-group-item">
									<a data-bind='attr: {href: "#" + id}, text: name'></a>
								</li>
							</ul>
						</div>
						
						<!--<div class="panel panel-default">
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
						</div>-->
					</div>
				</div>
				
				<div class="col-md-7">
					<div id="loading" data-bind="visible: loading">
						<img src="img/loading.gif" alt="Loading" />
					</div>
					
					<div id="itemsContainer" class="panel-group">
						<div data-bind="foreach: armors">
							<div class="panel panel-default" data-bind="visible: size() != 0">
								<div class="panel-heading">
									<a class="collapsed" data-toggle="collapse" data-bind='html: name + arrow, attr: {href: "#" + id}'></a>
									<span style="margin-right: -3px">(</span>
									<span data-bind='text: size() + " / ", visible: size() != null'></span>
									<span data-bind='text: value().length + ")"'></span>
								</div>
								
								<div class="panel-collapse collapse" data-bind="attr: {id: id}">
									<div class="panel-body" data-bind="foreach: value">
										<div class="itemBlock" data-bind='attr: {"data-gw2item": id}, visible: visible'>
											<img data-bind="attr: {src: img}" />
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div data-bind="foreach: weapons">
							<div class="panel panel-default" data-bind="visible: size() != 0">
								<div class="panel-heading">
									<a class="collapsed" data-toggle="collapse" data-bind='html: name + arrow, attr: {href: "#" + id}'></a>
									<span style="margin-right: -3px">(</span>
									<span data-bind='text: size() + " / ", visible: size() != null'></span>
									<span data-bind='text: value().length + ")"'></span>
								</div>
								
								<div class="panel-collapse collapse" data-bind="attr: {id: id}">
									<div class="panel-body" data-bind="foreach: value">
										<div class="itemBlock" data-bind='attr: {"data-gw2item": id}, visible: visible'>
											<img data-bind="attr: {src: img}" />
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</div>
				</div>
				<div class="col-md-3">
					<div id="search">
						<form class="form-inline" role="form">
							<div class="form-group has-feedback">
								<input type="search" class="form-control" id="inputSearch" placeholder="Search items" data-bind="value: search, valueUpdate: 'input'">
								<span class="glyphicon glyphicon-remove form-control-feedback" data-bind="visible: search" id="clearSearch"></span>
								<span class="glyphicon glyphicon-search form-control-feedback" data-bind="visible: !search()"></span>
							</div>
						</form>
					</div>
					
					<div id="itemDetails">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h5>Item Details</h5>
							</div>
							
							<ul class="list-group" data-bind="visible: detailId">
								<li class="list-group-item detailMain">
									<div class="detailLeft pull-left">
										<img class="detailIcon" data-bind="attr: {src: detailIcon}" />
										<small class="detailCode" data-copied-hint="Copied" data-bind='text: detailCode, attr: {"data-clipboard-text": detailCode}'></small>
									</div>
									<h5 class="detailName" data-bind="text: detailName"></h5>
									<p class="detailDesc text-muted" data-bind="text: detailDesc"></p>
								</li>
								
								<li class="list-group-item detailImages" data-bind="visible: detailImages().length > 0">
									<div class="center-block detailImageContainer" data-bind="foreach: detailImages">
										<div class="detailImage">
											<img data-bind="attr: {src: src, alt: alt}" />
										</div>
									</div>
								</li>
								
								<li class="list-group-item detailAcquire" data-bind="visible: (detailAcquire() || detailRecipe())">
									<div data-bind="visible: detailAcquire">
										<h5>Acquisition</h5>
										<div data-bind="html: detailAcquire"></div>
									</div>
									
									<div data-bind="visible: detailRecipe">
										<h5>Recipe</h5>
										<div data-bind="html: detailRecipe"></div>
									</div>
								</li>
							</ul>
							
							<div class="panel-body" data-bind="visible: detailEmpty">
								<p class="text-muted">Click on an item to show details.</p>
							</div>
							
							<div class="panel-footer">
								<button type="button" class="btn btn-primary" id="trackerAdd" data-bind='attr: {"data-id": detailId}, enable: (detailId() && trackerAvailable()), text: trackerAddText'></button>
								<a class="btn btn-default" role="button" data-bind="attr: {href: detailPage}, css: {disabled: detailEmpty}">Official Wiki</a>
								<a class="btn btn-danger pull-right" role="button" data-bind="click: gw2w.clear, visible: detailId">Clear</a>
							</div>
						</div>
					</div>
					
					<div id="tracker">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h5>Item Tracker <span class="gw2tooltip glyphicon glyphicon-question-sign" data-toggle="tooltip" data-placement="right" title="The item tracker saves automagically! You can close or refresh your browser and everything will still be here."></span></h5>
							</div>
							
							<ul class="list-group" data-bind="foreach: tracker, visible: tracker().length > 0">
								<a href="#" class="trackerItem list-group-item" data-bind='attr: {"data-id": id}, click: gw2w.tracker.click'>
									<button type="button" class="btn btn-link pull-right" data-bind='click: gw2w.tracker.remove'>Remove</button>
									<img class="trackerIcon pull-left" data-bind="attr: {src: icon}" />
									<p class="trackerName list-group-item-heading" data-bind="text: name"></p>
								</a>
							</ul>
							
							<div class="panel-body" data-bind="visible: tracker().length < 1">
								<p class="text-muted">There are currently no items in the tracker.</p>
							</div>
							
							<div class="panel-footer">
								<button type="button" class="btn btn-default" data-copied-hint="Copied" id="trackerCopy" data-bind='enable: tracker().length > 0, attr: {"data-clipboard-text": trackerCode}'>Copy chat codes</button>
								<a class="btn btn-danger pull-right" role="button" data-bind="click: gw2w.tracker.clear, visible: tracker().length > 0">Clear</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<?php
			include('includes/modals.php');
			include('includes/footer.php');
		?>
		
		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>-->
		<script src="js/jquery.min.js"></script>
		<!-- Include all compiled plugins (below), or include individual files as needed -->
		<script src="js/bootstrap.min.js"></script>
		<!-- Knockout JS -->
		<script src="js/knockout-3.1.0.js"></script>
		<!-- Custom Script -->
		<script src="js/ZeroClipboard.min.js"></script>
		<script src="js/guildwars2-tooltip.jquery.min.js"></script>
		<script src="js/script.js"></script>
		
		
	</body>
</html>