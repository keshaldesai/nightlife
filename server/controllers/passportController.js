const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const authConfig = require('../config/authConfig.json');
const User = require('../models/user');

module.exports = function (passport) {
	passport.use(new GoogleStrategy(authConfig,
		function (accessToken, refreshToken, profile, done) {
			const newUser = {
				googleId: profile.id,
				token: accessToken,
				name: profile.name.givenName,
			};
			User.findOneAndUpdate({ googleId: profile.id }, newUser, { upsert: true, new: true }, function (err, user) {
				return done(err, user);
			});
		}
	));

	passport.serializeUser(function (user, done) {
		done(null, user.googleId);
	});

	passport.deserializeUser(function (id, done) {
		console.log('id:', id);
		User.findOne({ googleId: id }, function (err, user) {
			done(err, user);
		});
	});
}