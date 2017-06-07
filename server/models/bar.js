const mongoose = require('mongoose');

var Bar = mongoose.model('Bar', {
	barId: String,
	usersGoing: Array
});

module.exports = Bar;