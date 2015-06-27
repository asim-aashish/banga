var router = require('./routes'),
	SessionApi = require('../api/sessionapi').SessionApi,
	ErrorHandler = require('./error');

module.exports = function (app){
	//app.use(isLogInMiddleware)
	app.get('/',function (req,res, next) {
		res.send('lala');
	});
	
	app.use('/', router);
	app.use(ErrorHandler);
};
