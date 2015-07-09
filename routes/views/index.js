var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.title = 'Guild Wars 2 Wardrobe';
	
	q = keystone.list('Skin').model.find().sort("name").limit(20);
	
	view.on('init', function(next) {
		q.exec(function(err, result) {
			locals.skins = result;
			req.flash('info', {
				title: "Welcome to v2 beta",
				detail: '<p>Welcome to Guild Wars 2 Wardrobe! This site is currently under development, therefore you may experience it as laggy, slow, and/or intriguing in ways you cannot fully explain. Text found on this site may not be complete or 100% true, but trust me when I say that you are beautiful no matter what. You are gorgeous, and I like you for visiting this site.</p><p>The site is currently run on a somewhat cheap and slow server somewhere in Amsterdam, Netherlands, so if there are many users online at the same time, something may die. I hope it will not come to that, but it might. By the time the site goes live, I will naturally upgrade the server to a powerhouse of a machine so that everyone can have the same, great experience while window shopping for their ingame wardrobe.</p><p>Guild Wars 2 Wardrobe is utilizing Guild Wars 2\'s official API v2. The plan is, among other things, to use a user\'s API Token so they can login and retrieve all the skins they own directly from Arenanet\'s servers.</p><p>I hope you have a great stay, and please inform the developer, <a href="mailto:mail (at) christiangrimsgaard.net">Christian Grimsgaard</a> aka <a href="http://www.reddit.com/user/nightzirch/">/u/nightzirch</a>, if you find any bugs or have any suggestions as to how this site could be improved.</p>'
			});

			// If there are no results
			if(!result) {
				req.flash('error', "No skins were found in the database.");
			}

			next(err);
		});
	});
	
	// Render the view
	view.render('index');
	
};
