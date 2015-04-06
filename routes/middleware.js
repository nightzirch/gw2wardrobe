/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore');


/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	
	locals.navLinks = [
		{ label: 'Home',		key: 'home',		href: '/' },
		{ label: 'Armors',		key: 'armors',		href: '#',	subitems: [
			{ label: 'All weights',	key: 'armors',				href: '/armors' },
			{ label: 'Light',		key: 'armors-light',		href: '/armors/light' },
		 	{ label: 'Medium',		key: 'armors-medium',		href: '/armors/medium' },
			{ label: 'Heavy',		key: 'armors-heavy',		href: '/armors/heavy' }
		]},
		{ label: 'Weapons',		key: 'weapons',		href: '#',	subitems: [
			{ label: 'All weapons',		key: 'weapons',		href: '/weapons' },
			{ label: 'Two-handed',		key: 'weapons-twohanded',		href: '/weapons/twohanded' },
		 	{ label: 'One-handed',		key: 'weapons-onehanded',		href: '/weapons/onehanded' },
			{ label: 'Off hand',		key: 'weapons-offhand',			href: '/weapons/offhand' }
		]},
		{ label: 'Outfits',		key: 'outfits',		href: '/outfits' },
		{ label: 'Users',		key: 'users',		href: '/users' },
		{ label: 'About',		key: 'about',		href: '/about' }
	];
	
	if(req.user) {
		locals.userLinks = [
			{ label: 'Favorites',		key: 'favorites',		href: '/favorites',		badge:
				{ id: "badge-favorites", content: req.user.favorites.length, new: false }
			},
			{ label: 'Profile',		key: 'profile',		href: '/profile',	badge:
				{ id: "badge-completion", content: req.user.wardrobe.length, new: false }
			}
		];
	}
	
	locals.user = req.user;
	
	next();
	
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;
	
	next();
	
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
	
};
