const request = require('request');
const API_KEY = require('../config/placesConfig.json').API_KEY;

module.exports = function (app) {
	//API route handlers
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
				console.log(icon);
				return {
					name,
					id,
					rating,
					icon
				};
			});
			res.json(cleanRes);
		});
	});
}
//id
//name
//rating
//icon