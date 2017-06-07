module.exports = function (err, res, statusCode) {
	console.error(err);
	res.status(statusCode).end();
}