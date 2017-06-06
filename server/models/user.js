const mongoose = require('mongoose');

var User = mongoose.model('User', {
	googleId: String,
	token: String,
	name: String
});

module.exports = User;