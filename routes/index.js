var router = require('./routes'),
	SessionApi = require('../api/sessionapi').SessionApi,
	ErrorHandler = require('./error');

module.exports = function (app){
	//app.use(isLogInMiddleware)
	app.use('/', router);
	app.use(function(req, res, next) {
		SessionApi.checkSessionId(req.headers.session_id, function(err, user){
			if(err){next(err);}
			next();
		});
	});
	app.use(ErrorHandler);
}