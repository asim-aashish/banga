var router = require('./routes'),
	SessionApi = require('../api/sessionapi').SessionApi,
	ErrorHandler = require('./error');

module.exports = function (app){
	//app.use(isLogInMiddleware)
	app.use('/', router);
	app.use(ErrorHandler);
}