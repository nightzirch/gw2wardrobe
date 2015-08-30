/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone'),
	middleware = require('./middleware'),
	importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {

	// Views
	app.get('/', routes.views.index);

	app.get('/search/:query', routes.views.search);

	app.get('/armors', routes.views.armors);
	app.get('/armors/:weight', routes.views.armors);
	app.get('/weapons', routes.views.weapons);
	app.get('/weapons/:type', routes.views.weapons);
//	app.get('/favorites', routes.views.favorites);

//	app.get('/outfits-and-tonics', routes.views.outfitsAndTonics);
//	app.get('/item/:itemid', routes.views.item);

	app.get('/skin/:skinid', routes.views.skin);
	app.post('/skin/:skinid/favorite', routes.views.skinFavorite);
	app.post('/skin/:skinid/owned', routes.views.skinOwned);

	app.get('/leaderboard', routes.views.leaderboard);

//	app.get('/users', routes.views.users);
//	app.get('/user/:username', routes.views.user);

	app.get('/about', routes.views.about);

	app.get('/profile', routes.views.profile);
	app.get('/profile/edit', routes.views.profileEdit);
	app.post('/profile/update', routes.views.profileUpdate);
	app.post('/profile/updateSkinsUnlocked', routes.views.profileUpdateSkinsUnlocked)

	app.get('/register', routes.views.register);
	app.post('/register/post', routes.views.registerUser);
	app.get('/login', routes.views.login);
	app.post('/login', routes.views.login);
	app.get('/logout', routes.views.logout);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
