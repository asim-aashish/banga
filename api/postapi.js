var SessionApi = require('../api/sessionapi').SessionApi,
	Post = require('mongoose').model('Post');
var PostApi = function () {};

PostApi.prototype.findMainPosts = function(session_id, callback){
	if(session_id){
		Post.find({}).limit(15).sort({_id:-1}).exec(function (err, docs) {
					if(err) {callback(err, null);}
					var Posts = docs;
					console.log('Displaying Main Page');
					for (var i = 0; i < docs.length; i++) {
						Posts[i].created_at = Date.parse(Posts[i].created_at);
					}
					callback(null,Posts);
				});
	}
};

module.exports.PostApi = exports.PostApi = new PostApi();
