var UserApi = require('./../../api/userapi').UserApi,
	User = require('mongoose').model('User'),
	_ = require('underscore'),
	SessionApi = require('./../../api/sessionapi').SessionApi;
var Userroute = function(){};
Userroute.prototype.doUserSignUp = function (req, res, next){
	var data = {
		username: req.body.username,
		contact_no: req.body.contact_no,
		email: req.body.email,
		password: req.body.password,
		created_on: (new Date()).valueOf().toString(),
		modified_at: (new Date()).valueOf().toString(),
	};
	UserApi.ValidateSignUp(data,function(err, valid){
		if(err){
			console.log("Validation:Failed");
			return next(err);
			}
		if(valid){
			console.log("Validation:Success");
			User.create(data, function(err){
				if (err){
					console.log('Registration:Failed');
					return next(err);
				}
				else{
					console.log('Registration:Success');
					SessionApi.startSession(data.username, function(err, sessionbox){
						if(err){return next(err);}
						var obj = [sessionbox];
						res.json(obj);
						next();
					});
				}
			});
		}
	});
};
Userroute.prototype.doUserLogin = function(req, res, next){
	var data = {
		contact_no: req.body.mobileno,
		password: req.body.password,
	};
	User.findOne({contact_no: data.contact_no}, function(err, doc) {
		if (err) {return next(err);}
		else {
			console.log(doc);
			if(doc.password === data.password){
				SessionApi.startSession(doc.username, function(err,sessionbox){
					if(err){return next(err);}
					var obj = [sessionbox];
					res.json(obj);
					next();
				});
			}
			else{
				next(new Error("Password is incorrect"));
			}
		}
	});
};
Userroute.prototype.doUserLogOut = function(req, res, next){
	var data = {
		session_id: req.headers.session_id,
	};
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){return next(err);}
		else{
			SessionApi.destroySession(data.session_id,function(err){
				if(err){return next(err);}
				console.log("session_id :"+data.session_id+" destroyed");
				res.json([{
					status:"ok"
				}]);
				next();
			});
		}
	});
};
Userroute.prototype.getUserbySessionId = function(req, res, next){
	var data = {
		session_id: req.headers.session_id,
	};
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){return next(err);}
		else{
			User.findOne({username:user}, function (err, docs) {
				if(err) {return next(err);}
				res.json([docs]);
				next();
			});
		}
	});
};
Userroute.prototype.getUserbyParamName = function(req, res, next){
	var data = {
		session_id:req.headers.session_id,
		paramname: req.param.username,
	};
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){return next(err);}
		else{
			console.log("finding user by :username :"+data.paramname);
			User.findOne({username: data.paramname}, function(err, doc) {
				if (err) {return next(err);}
				else {
					console.log(doc);
					res.json([doc]);
				}
			});
		}
	});
};
Userroute.prototype.modifyUser = function(req, res, next){
	console.log("checking session_id: " + req.headers.session_id);
	var moreData = _.pick(req.body, _.keys(User.schema.tree));
	SessionApi.checkSessionId(req.headers.session_id, function(err, user){
		if(err){return next(err);}
		else{
			User.findOne({username:user},function(err, doc){
				if (err){return next(err);}
				_.extend(doc, moreData);
				doc.save(function(err){
					if(err){return next(err);}
				});
				res.json([{
					status: 'ok',
				}]);
				console.log(doc);
				next();
			});
		}
	});
};
Userroute.prototype.UploadProfilePicture = function(req, res, next) {
	var img = new mongoose.model('Image')();
	img.title = req.body.title;
	img.description = req.body.description;
	console.log('tammopa'+img.title+" "+img.description);
	img.attach('image', req.files.image, function(err) {
		if(err) return next(err);
		console.log('Attachment Started');
		post.save(function(err) {
			if(err) return next(err);
			console.log('saving complete');
			res.json([{status:'ok'}]);
		});
	});
};
module.exports.Userroute = exports.Userroute = new Userroute();
