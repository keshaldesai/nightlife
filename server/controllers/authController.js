const jwt = require('jsonwebtoken');
const passport = require('passport');
const secret = require('../config/jwtConfig.json').secret;
const User = require('../models/user');

module.exports = function (app) {

	//client app login through this route
	app.get('/auth/google',
		passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

	//google auth callbacks to this route
	app.get('/auth/google/callback',
		passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }),
		function (req, res) {
			const token = jwt.sign({ token: req.user.token }, secret);
			res.redirect('http://localhost:3000?token=' + token);
		});

	//verifies client by token, returns user info to client app
	app.post('/api/auth/in', function (req, res) {
		if (req.body.token) {
			jwt.verify(req.body.token, secret, null, function (err, decoded) {
				if (err) {
					console.error(err);
					return res.status(401).end();
				} else {
					User.findOne({ token: decoded.token }, function (err, user) {
						if (err) {
							console.error(err);
							return res.status(401).end();
						} else {
							return res.json({
								id: user.googleId,
								name: user.name
							});
						}
					});
				}
			});
		} else {
			return res.status(401).end();
		}
	});

	//handles server side logout (token removal from DB)
	app.post('/api/auth/out', function (req, res) {
		if (req.body.token) {
			jwt.verify(req.body.token, secret, null, function (err, decoded) {
				if (err) {
					console.error(err);
					return res.status(401).end();
				} else {
					User.findOneAndUpdate({ token: decoded.token }, { token: '' }, function (err, user) {
						if (err) console.error(err);
						return res.end();
					});
				}
			});
		} else {
			return res.status(401).end();
		}
	});
}