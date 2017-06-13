const request = require('request');
const API_KEY = require('../config/placesConfig.json').API_KEY;
const Bar = require('../models/bar');
const verifyUser = require('../helpers/verifyUser');
const errorHandler = require('../helpers/errorHandler');
const streams = 'streams';

module.exports = function (app) {
	//API route handlers

	//returns list of bars nearby a location
	app.post('/api/search', (req, res) => {
		const { location, userId, token } = req.body;
		request.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?', {
			qs: {
				key: API_KEY,
				location,
				radius: '8047',
				type: 'bar'
			}
		}, (err, response, body) => {
			if (err) {
				return errorHandler(err, res, 400);
			} else {
				const callback = (user) => {
					const { results } = JSON.parse(body);
					const trimRes = results.length > 10 ? results.slice(0, 10) : results;
					const obj = {};
					trimRes.forEach((bar, index) => {
						const { name, id, rating, photos, vicinity } = bar;
						const icon = photos ? `https://maps.googleapis.com/maps/api/place/photo?&maxwidth=300&photoreference=${photos[0].photo_reference}&key=${API_KEY}` : '';
						Bar.findOne({ barId: id }, (err, savedBar) => {
							if (err) {
								return errorHandler(err, res, 400);
							} else if (savedBar && savedBar.usersGoing.length > 0) {
								savedBar.usersGoing.find((userGoing) => {
									obj[index] = { name, id, rating, icon, vicinity };
									obj[index].usersGoing = savedBar ? savedBar.usersGoing.length : 0;
									if (user && userGoing === user.googleId) {
										obj[index].going = true;
										if (Object.keys(obj).length === shortRes.length) {
											return res.json(obj);
										}
										return true;
									} else {
										obj[index].going = false;
										if (Object.keys(obj).length === shortRes.length) {
											return res.json(obj);
										}
										return false;
									}
								});
							} else {
								obj[index] = { name, id, rating, icon, vicinity };
								obj[index].usersGoing = 0;
								obj[index].going = false;
								if (Object.keys(obj).length === shortRes.length) {
									return res.json(obj);
								}
							}
						});
					});
				}
				if (token) {
					verifyUser(token, res, callback);
				} else {
					callback();
				}
			}
		});
	});

	//authenticated request for +1ing or -1ing
	app.post('/api/rsvp', (req, res) => {
		const { token, barId, rsvp } = req.body;
		const callback = user => {
			Bar.findOne({ barId }, (err, bar) => {
				if (err) {
					return errorHandler(err, res, 400);
				} else if (!bar) {
					const bar = new Bar({
						barId,
						usersGoing: [user.googleId]
					});
					bar.save((err, bar) => {
						if (err) {
							return errorHandler(err, res, 400);
						} else {
							return res.json(bar);
						}
					});
				} else {
					const userId = user.googleId;
					let newUsers = bar.usersGoing.filter(user => {
						return user !== userId
					});
					bar.usersGoing = rsvp ? newUsers.concat([userId]) : newUsers;
					bar.save((err, bar) => {
						if (err) {
							return errorHandler(err, res, 400);
						} else {
							return res.json(bar);
						}
					});
				}
			});
		}
		verifyUser(token, res, callback);
	});
}