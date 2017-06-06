const request = require('request');
const API_KEY = require('../config/placesConfig.json').API_KEY;

module.exports = function (app) {
	//API route handlers
	app.post('/api/search', function (req, res) {
		console.log(req.body);
		request.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?', {
			qs: {
				key: API_KEY,
				location: req.body.location,
				radius: '1000',
				type: 'bar'
			}
		}).pipe(res);
	});
}