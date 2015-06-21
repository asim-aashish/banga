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
				expiry: req.body.expiry,
				created_at: new Date(),
				modified_at: new Date(),
			}
		console.log("checking session_id: " + req.headers.session_id);
		SessionApi.checkSessionId(req.headers.session_id, function(err, user){
			if(err){next(err);}
			else{
				data.author = user;
				console.log('initiating posting for user: '+ data.author);
				Post.create(data, function(err){
				if (err){next(err);}
				else{
					console.log('Post creation:Success for user :'+ data.author)
					next();
				}
				});
			}
		});
	}

module.exports.PostApi = exports.PostApi = new PostApi;