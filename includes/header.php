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
			
			<ul class="nav navbar-nav navbar-right">
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">Tools <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<li><a href="#" data-bind="click: gw2w.modal.clearLocalStorage">Clear Local Storage</a></li>
					</ul>
				</li>
				
				<!--<li>
					<a href="#">Upload fashion</a>
				</li>
				
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<span class="glyphicon glyphicon-user"></span> 
						Login 
						<b class="caret"></b></a>
					<ul class="dropdown-menu">
						<li>
							<form id="loginForm" class="navbar-form" role="form">
								<div class="form-group">
									<label class="sr-only" for="loginEmail">Email address</label>
									<input type="email" class="form-control" id="loginEmail" placeholder="Email">
								</div>
								<div class="form-group">
									<label class="sr-only" for="loginPassword">Password</label>
									<input type="password" class="form-control" id="loginPassword" placeholder="Password">
								</div>
								<div class="checkbox">
									<label>
										<input type="checkbox"> Remember me
									</label>
								</div>
								<p>
									<button type="submit" class="btn btn-primary">Login</button>
									<button type="submit" class="btn btn-default">Register</button>
								</p>
							</form>
						</li>
					</ul>
				</li>
				
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<span class="glyphicon glyphicon-user"></span> 
						username 
						<b class="caret"></b></a>
					<ul class="dropdown-menu">
						<li><a href="#">Profile</a></li>
						<li><a href="#">Edit profile</a></li>
						<li class="divider"></li>
						<li><a href="#">Log out</a></li>
					</ul>
				</li>-->
			</ul>
		</div><!-- /.navbar-collapse -->
	</div><!-- /.container-fluid -->
</nav>