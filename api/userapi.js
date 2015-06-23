var SessionApi = require('../api/sessionapi').SessionApi,
	User = require('mongoose').model('User');

var UserApi = function (){};

UserApi.prototype.getUserbySessionId = function(req, res, next){
	var data = {
		session_id: req.headers.session_id,
	}
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){next(err);}
		else{
			User.findOne({username:user}, function (err, docs) {
				if(err) {next(err);}
				res.json([docs]);
				next();
			});
		}
	});
}
UserApi.prototype.getUserbyParamName = function(req, res, next){
	var data = {
		session_id:req.headers.session_id,
		paramname: req.param.username,
	}
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){next(err);}
		else{
			console.log("finding user by :username :"+data.paramname)
			User.findOne({username: data.paramname}, function(err, doc) {
				if (err) {next(err);}
				else {
					console.log(doc);
					res.json([doc]);
				}
			});
		}
	});

}
UserApi.prototype.modifyUser = function(req, res, next){
	console.log("checking session_id: " + req.headers.session_id);
	var moreData = _.pick(req.body, _.keys(User.schema.tree));
	SessionApi.checkSessionId(req.headers.session_id, function(err, user){
		if(err){next(err);}
		else{
			// User.update({ name: 'Tobi' }, { ferret: true }, { multi: true }, function (err, raw) {
			// 	if (err) return handleError(err);
			// 	console.log('The raw response from Mongo was ', raw);
			// });
			User.findOne({username:user},function(err, doc){
				if (err){next(err);}
				console.log(doc);
				_.extend(doc, moreData);
				doc.save(function(err, save, asave){
					res.json([{
						status: 'ok',
						result: [save, asave]
					}])
				})
				next();
			});
		}
	});
}

module.exports.UserApi = exports.UserApi = new UserApi;