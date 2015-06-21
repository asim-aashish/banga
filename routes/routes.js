var router = require('express').Router(),
	User = require('mongoose').model('User'),
	SessionApi = require('../api/sessionapi').SessionApi,
	PostApi = require('../api/postapi').PostApi,
	UserApi = require('../api/userapi').UserApi,
	Session = require('mongoose').model('Session'),
	Post = require('mongoose').model('Post');

var doUserSignUp = function (req, res, next){
	var data = {
		username: req.body.username,
		contact_no: req.body.contact_no,
		email: req.body.email,
		password: req.body.password,
		created_at: (new Date()).toISOString()
	};
	User.create(data, function(err){
		if (err){
			console.log('Registration:Failed: ', err);
			next(err);
		}
		else{
			console.log('Registration:Success');
			SessionApi.startSession(data.username, function(sessionbox){
				res.send(sessionbox);
				next();
			});
		}
	});
}
var doUserLogin = function(req, res, next){
	var data = {
		username: req.body.username,
		password: req.body.password,
	}
	User.findOne({username: data.username}, function(err, doc) {
		if (err) {next(err);}
		else {
			console.log(doc);
			if(doc.password === data.password){
				SessionApi.startSession(data.username, function(sessionbox){
					res.send(sessionbox);
					next();
				});
			}
			else{
				next(new Error("Password is incorrect"));
			}

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
				var Posts = docs;
				console.log(Posts);
				next();
			});
		}
	});
}


router.post('/signup', doUserSignUp);
router.post('/login', doUserLogin);
router.get('/', displayMainPage);
router.post('/post', PostApi.postaPost);
router.get('/profile', UserApi.getUser);
router.post('/profile/edit', UserApi.modifyUser)

module.exports = exports = router;