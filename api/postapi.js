var SessionApi = require('../api/sessionapi').SessionApi,
	Post = require('mongoose').model('Post');
var PostApi = function () {};

PostApi.prototype.postaPost = function (req, res, next) {
	var data = 
		{
			title: req.body.title,
			mainbody: req.body.mainbody,
			//author: req.body.author,
			type: req.body.type,
			tags: req.body.tags,
			cover_pic: req.body.cover_pics,
			more_pics: req.body.more_pics,
			expiry_date: req.body.expiry_date,
			expiry_time: req.body.expiry_time,
			created_at: new Date(),
			modified_at: new Date(),
		}
	console.log("data.expiry_date: "+data.expiry_time+"data.expiry_time: "+data.expiry_time);
	console.log("checking session_id: " + req.headers.session_id);
	SessionApi.checkSessionId(req.headers.session_id, function(err, user){
		if(err){next(err);}
		else{
			data.author = user;
			console.log('initiating posting for user: '+ data.author);
			Post.create(data, function(err){
			if (err){next(err);}
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
}
PostApi.prototype.getPostsbyType = function(req, res, next){
	var data = {
		session_id: req.headers.session_id,
		type:req.param.type,
	}
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){next(err);}
		else{
			Post.find({type:data.type}, function (err, docs) {
				if(err) {next(err);}
				console.log('Displaying Posts by :type :'+data.type);
				var Posts = docs;
				res.json(Posts);
				next();
			});
		}
	});
}
PostApi.prototype.getPostsbyId = function(req, res, next){
	var data = {
		session_id: req.headers.session_id,
		post_id:req.param.post_id,
	}
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){next(err);}
		else{
			Post.find({_id:data.post_id}, function (err, docs) {
				if(err) {next(err);}
				console.log('Displaying Posts by :type :'+data.type);
				var Posts = docs;
				res.json(Posts);
				next();
			});
		}
	});
}
PostApi.prototype.getPostsbyMainUser = function(req, res, next){
	var data = {
		session_id: req.headers.session_id,
	}
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){next(err);}
		else{
			Post.find({author:user}, function (err, docs) {
				if(err) {next(err);}
				console.log('Displaying Posts written by Main user : '+user);
				var Posts = docs;
				res.json(Posts);
				next();
			});
		}
	});
}
module.exports.PostApi = exports.PostApi = new PostApi;