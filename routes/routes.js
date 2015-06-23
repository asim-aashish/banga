var router = require('express').Router(),
	User = require('mongoose').model('User'),
	SessionApi = require('../api/sessionapi').SessionApi,
	PostApi = require('../api/postapi').PostApi,
	UserApi = require('../api/userapi').UserApi,
	Session = require('mongoose').model('Session'),
	_ = require('underscore'),
	Post = require('mongoose').model('Post');

var doUserSignUp = function (req, res, next){
	var data = {
		username: req.body.username,
		contact_no: req.body.contact_no,
		email: req.body.email,
		password: req.body.password,
		created_at: (new Date()).toDateString(),
	};
	User.create(data, function(err){
		if (err){
			console.log('Registration:Failed: ', err);
			next(err);
		}
		else{
			console.log('Registration:Success');
			SessionApi.startSession(data.username, function(sessionbox){
				var obj = [sessionbox];
				res.json(obj);
				next();
			});
		}
	});
}
var doUserLogin = function(req, res, next){
	var data = {
		contact_no: req.body.mobileno,
		password: req.body.password,
	}
	User.findOne({contact_no: data.contact_no}, function(err, doc) {
		if (err) {next(err);}
		else {
			console.log(doc);
			if(doc.password === data.password){
				SessionApi.startSession(doc.username, function(sessionbox){
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
}
var doUserLogOut = function(req, res, next){
	var data = {
		session_id: req.headers.session_id,
	}
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){next(err);}
		else{
			SessionApi.destroySession(data.session_id,function(err){
				if(err){next(err);}
				console.log("session_id :"+data.session_id+" destroyed");
				res.json([{
					status:"ok"
				}]);
				next();
			})
		}
	});	
}
var displayMainPage = function(req, res, next){
	var data = {
		session_id: req.headers.session_id,
	}
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){next(err);}
		else{
			Post.find({}, function (err, docs) {
				if(err) {next(err);}
				console.log('Displaying Main Page');
				var Posts = docs;
				res.json(Posts);
				next();
			});
		}
	});
}
router.use('',function(req, res, next) {
	SessionApi.checkSessionId(req.headers.session_id, function(err, user){
		if(err){next(err);}
		next();
	});
});
router.post('/signup', doUserSignUp);
router.post('/login', doUserLogin);
router.delete('/logout',doUserLogOut);
router.get('/', displayMainPage);
router.post('/post', PostApi.postaPost);
router.get('/profile', UserApi.getUserbySessionId);
router.put('/profile/edit', UserApi.modifyUser);
router.get('/profile/:username',UserApi.getUserbyParamName);
router.get('/post/:type',PostApi.getPostsbyType);
router.get('/post',PostApi.getPostsbyMainUser);

module.exports = exports = router;