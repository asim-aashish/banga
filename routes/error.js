module.exports = function ErrorHandler(app, err, req, res, next){
	this.logErrors = function(err, req, res, next) {
		console.error(err.stack);
		next(err);
	}
	this.clientErrorHandler = function(err, req, res, next) {
		if (req.xhr) {
			res.status(500).send({ error: 'Something blew up!' });
		} else {
			next(err);
		}
	}
	this.errorHandler = function(err, req, res, next) {
		res.status(500);
		res.render('error', { error: err });
	}
	app.use(logErrors);
	app.use(clientErrorHandler);
	app.use(errorHandler);
}