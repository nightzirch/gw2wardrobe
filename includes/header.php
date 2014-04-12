<?php
	function activePage($page) {
		$pattern = '/' . $page . '/';
		$server = $_SERVER['PHP_SELF'];
		$regex = preg_match($pattern, $server);
		
        if($regex) {
			return 'class="active"';
		}
    }
?>

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
			<a class="navbar-brand" href="/">GuildWars2 Wardrobe <span class="badge badge-danger">ALPHA</span></a>
		</div>
		
		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
				<li data-bind="css: {active: pathHome}"><a href="/">Home</a></li>
				<!--<li <?php echo activePage("fashion") ?>><a href="/fashion">Passion for Fashion</a></li>-->
				<li <?php echo activePage("about") ?>><a href="/about">About</a></li>
				<li><a href="https://github.com/nightzirch/gw2wardrobe/commits/master">Changelog</a></li>
			</ul>
		</div><!-- /.navbar-collapse -->
	</div><!-- /.container-fluid -->
</nav>