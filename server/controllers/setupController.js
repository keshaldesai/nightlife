const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

module.exports = function (app) {
	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(passport.initialize());
}