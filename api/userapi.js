var SessionApi = require('../api/sessionapi').SessionApi,
	User = require('mongoose').model('User');

var UserApi = function (){};

UserApi.prototype.getUser = function(req, res, next){
	var data = {
		session_id: req.headers.session_id,
	}
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){next(err);}
		else{
			User.find({username:user}, function (err, docs) {
				if(err) {next(err);}
				res.send(docs);
				next();
			});
		}
	});
}
User.prototype.modifyUser = function(req, res, next){
	var data = {
		session_id: req.headers.session_id,
	}
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){next(err);}
		else{
			// User.update({ name: 'Tobi' }, { ferret: true }, { multi: true }, function (err, raw) {
			// 	if (err) return handleError(err);
			// 	console.log('The raw response from Mongo was ', raw);
			// });
		}
	});
}

module.exports.UserApi = exports.UserApi = new UserApi;