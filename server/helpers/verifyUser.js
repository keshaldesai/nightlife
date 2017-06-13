//token, secret, userId
const jwt = require('jsonwebtoken');
const secret = require('../config/jwtConfig.json').secret;
const User = require('../models/user');
const errorHandler = require('./errorHandler');

module.exports = function (token, res, cb) {
	if (!token || !res || !cb) {
		return res.status(400).end();
	}
	jwt.verify(token, secret, null, (err, decoded) => {
		if (err) {
			return errorHandler(err, res, 401);
		} else {
			User.findOne({ token: decoded.token }, (err, user) => {
				if (err || !user) {
					return errorHandler(err, res, 401);
				} else {
					return cb(user);
				}
			});
		}
	});
}