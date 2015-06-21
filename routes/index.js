var router = require('./routes'),
	ErrorHandler = require('./error');

module.exports = function (app){
	//app.use(isLogInMiddleware)
	app.use('/', router);
	app.use(ErrorHandler);
}