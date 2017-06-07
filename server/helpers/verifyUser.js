//token, secret, userId
const jwt = require('jsonwebtoken');
const secret = require('../config/jwtConfig.json').secret;
const User = require('../models/user');

module.exports = function (token, userId, res, cb) {
	jwt.verify(token, secret, null, (err, decoded) => {
		if (err) {
			console.error(err);
			res.status(401).end();
		} else {
			User.findOne({ token: decoded.token, googleId: userId }, (err, user) => {
				if (err || !user) {
					console.error(err);
					res.status(401).end();
				} else {
					cb();
				}
			});
		}
	});
}