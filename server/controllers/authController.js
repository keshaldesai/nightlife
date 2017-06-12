const jwt = require('jsonwebtoken');
const passport = require('passport');
const secret = require('../config/jwtConfig.json').secret;
const User = require('../models/user');
const verifyUser = require('../helpers/verifyUser');
const errorHandler = require('../helpers/errorHandler');

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
		const cb = (user) => {
			return res.json({
				id: user.googleId,
				name: user.name
			});
		}
		verifyUser(req.body.token, res, cb);
	});

	//handles server side logout (token removal from DB)
	app.post('/api/auth/out', function (req, res) {
		const cb = (user) => {
			user.token = '';
			user.save((err, user) => {
				return res.end();
			});
		};
		verifyUser(req.body.token, res, cb);
	});

	//get user info
	app.post('/api/user', function (req, res) {
		const cb = (user) => {
			res.json({
				name: user.name,
				googleId: user.googleId
			});
		};
		verifyUser(req.body.token, res, cb);
	});
}