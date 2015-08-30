var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User');

User.add({
	username: { type: String, initial: true, required: true, index: true, unique: true },
	email: { type: Types.Email, initial: true, required: true, index: true, unique: true },
	password: { type: Types.Password, initial: true, required: true },
	registered: { type: Types.Datetime, required: true, default: Date.now},
	about: { type: Types.Textarea },
	image: { type: Types.Url, default: "http://placehold.it/128" },
	token: { type: String, initial: false, required: false }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

User.schema.add({
	favorites: { type: [Number] },
	wardrobe: { type: [Number] },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Registration
 */

User.defaultColumns = 'username, email, isAdmin';
User.register();
