const request = require('request');
const API_KEY = require('../config/placesConfig.json').API_KEY;
const Bar = require('../models/bar');
const jwt = require('jsonwebtoken');
const secret = require('../config/jwtConfig.json').secret;
const User = require('../models/user');

module.exports = function (app) {
	//API route handlers

	//returns list of bars nearby a location
	app.post('/api/search', (req, res) => {
		request.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?', {
			qs: {
				key: API_KEY,
				location: req.body.location,
				radius: '1000',
				type: 'bar'
			}
		}, (error, response, body) => {
			const { results } = JSON.parse(body);
			const cleanRes = results.map(bar => {
				const { name, id, rating, photos } = bar;
				let icon = '';
				if (photos) {
					icon = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${API_KEY}`;
				}
				return {
					name,
					id,
					rating,
					icon
				};
			});
			res.json(results);
		});
	});

	//authenticated request for +1ing
	//will take userid, barId, and token
	app.post('/api/rsvp', (req, res) => {
		const { token, userId, barId, rsvp } = req.body;
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
						Bar.findOne({ barId: barId }, (err, bar) => {
							if (err) {
								res.status(404).end();
							} else {
								if (!bar) {
									const bar = new Bar({
										barId,
										usersGoing: [userId]
									});
									bar.save((err, bar) => {
										if (err) {
											console.error(err);
											res.status(404).end();
										} else {
											res.json(bar);
										}
									});
								} else {
									console.log(bar.usersGoing, bar.barId);
									let newUsers = bar.usersGoing.filter(user => {
										return user !== userId
									});
									bar.usersGoing = rsvp ? newUsers.concat([userId]) : newUsers;
									bar.save((err, bar) => {
										if (err) {
											console.error(err);
											res.status(404).end();
										} else {
											console.log(bar);
											res.json(bar);
										}
									});
								}
							}
						});
					}
				});
			}
		});
	});
}

//pull out auth
//error handler