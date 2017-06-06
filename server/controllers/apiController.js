const request = require('request');
const API_KEY = require('../config/placesConfig.json').API_KEY;
const googleMapsClient = require('@google/maps').createClient({
	key: API_KEY
});

module.exports = function (app) {
	//API route handlers
	app.get('/api/search', function (req, res) {
		googleMapsClient.geocode({
			address: '1600 Amphitheatre Parkway, Mountain View, CA'
		}, function (err, response) {
			if (!err) {
				console.log(response.json.results);
			}
		});
	});
}