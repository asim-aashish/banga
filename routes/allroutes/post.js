var PostApi = require('./../../api/postapi').PostApi,
	SessionApi = require('./../../api/sessionapi').SessionApi,
	User = require('mongoose').model('User'),
	Post = require('mongoose').model('Post');
var Postroute = function(){};
Postroute.prototype.getPostsbyMainUser = function(req, res, next){
	var data = {
		session_id: req.headers.session_id,
	};
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){return next(err);}
		else{
			Post.find({author:user}, function (err, docs) {
				if(err) {return next(err);}
				console.log('Displaying Posts written by Main user : '+user);
				var Posts = docs;
				Posts.sort({created_at:-1});
				res.json(Posts);
				next();
			});
		}
	});
};
Postroute.prototype.getPostsbyType = function(req, res, next){
	var data = {
		session_id: req.headers.session_id,
		type:req.param.type,
	};
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){return next(err);}
		else{
			Post.find({type:data.type}, function (err, docs) {
				if(err) {return next(err);}
				console.log('Displaying Posts by :type :'+data.type);
				var Posts = docs;
				res.json(Posts);
				next();
			});
		}
	});
};
Postroute.prototype.getPostsbyId = function(req, res, next){
	var data = {
		session_id: req.headers.session_id,
		post_id:req.param.post_id,
	};
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){return next(err);}
		else{
			Post.findById(data.post_id, function (err, doc) {
				if(err) {return next(err);}
				console.log('Displaying Post for :id :'+data.post_id);
				var Posts = doc;
				res.json([Post]);
				next();
			});
		}
	});
};
Postroute.prototype.postaPost = function (req, res, next) {
	var data =
		{
			created_on: (new Date()).valueOf().toString(),
			title: req.body.title,
			mainbody: req.body.mainbody,
			type: req.body.type,
			tags: req.body.tags,
			cover_pic: req.body.cover_pics,
			more_pics: req.body.more_pics,
			expiry_date: req.body.expiry_date,
			expiry_time: req.body.expiry_time,
			modified_at: (new Date()).valueOf().toString(),
		};
	console.log("created at"+data.created_on);
	console.log("data.expiry_date: "+data.expiry_time+"data.expiry_time: "+data.expiry_time);
	console.log("checking session_id: " + req.headers.session_id);
	SessionApi.checkSessionId(req.headers.session_id, function(err, user){
		if(err){return next(err);}
		else{
			data.author = user;
			console.log('initiating posting for user: '+ data.author);
			Post.create(data, function(err){
			if (err){return next(err);}
			else{
				console.log('Post creation:Success for user :'+ data.author);
				res.json([{
					status:"ok"
				}]);
				next();
			}
			});
		}
	});
};
Postroute.prototype.getProfilebySessionId = function (req, res, next) {
	var data = {
		session_id: req.headers.session_id,
	};
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){return next(err);}
		else{
			Post.find({author:user}, function (err, docs) {
				if(err) {return next(err);}
				console.log('Displaying Posts written by Main user : '+user);
				var Posts = docs;
				Posts.sort({created_at:-1});
				User.findOne({username:user}, function (err, doc) {
					res.json([{'user':doc},{'posts':Posts}]);
					next();
				});
			});
		}
	});
};
Postroute.prototype.displayMainPage = function(req, res, next){
	var data = {
		session_id: req.headers.session_id,
	};
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){return next(err);}
		else{
			PostApi.findMainPosts(data.session_id, function(err,docs){
				if(err){return next(err);}
				res.json(docs);
				next();
			});
		}
	});
};
module.exports.Postroute = exports.Postroute = new Postroute();
