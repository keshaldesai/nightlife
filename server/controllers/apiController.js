const request = require('request');
const API_KEY = require('../config/placesConfig.json').API_KEY;
const Bar = require('../models/bar');
const verifyUser = require('../helpers/verifyUser');
const errorHandler = require('../helpers/errorHandler');

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
		}, (err, response, body) => {
			if (err) {
				errorHandler(err, res, 400);
			} else {
				const { results } = JSON.parse(body);
				const cleanRes = results.map(bar => {
					const { name, id, rating, photos } = bar;
					const icon = photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${API_KEY}` : '';
					return { name, id, rating, icon };
				});
				res.json(cleanRes);
			}
		});
	});

	//authenticated request for +1ing or -1ing
	app.post('/api/rsvp', (req, res) => {
		const callback = function () {
			Bar.findOne({ barId: barId }, (err, bar) => {
				if (err) {
					errorHandler(err, res, 400);
				} else {
					if (!bar) {
						const bar = new Bar({
							barId,
							usersGoing: [userId]
						});
						bar.save((err, bar) => {
							if (err) {
								errorHandler(err, res, 400);
							} else {
								res.json(bar);
							}
						});
					} else {
						let newUsers = bar.usersGoing.filter(user => {
							return user !== userId
						});
						bar.usersGoing = rsvp ? newUsers.concat([userId]) : newUsers;
						bar.save((err, bar) => {
							if (err) {
								errorHandler(err, res, 400);
							} else {
								res.json(bar);
							}
						});
					}
				}
			});
		}
		const { token, userId, barId, rsvp } = req.body;
		verifyUser(token, userId, res, callback);
	});
}