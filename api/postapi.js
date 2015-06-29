var SessionApi = require('../api/sessionapi').SessionApi,
	Post = require('mongoose').model('Post');
var PostApi = function () {};

PostApi.prototype.findMainPosts = function(session_id, callback){
	if(session_id){
		Post.find({}).limit(50).sort({_id:-1}).exec(function (err, docs) {
					if(err) {return callback(err, null);}
					if(!docs){return callback (new Error('no posts found'), null);}
					var Posts = docs;
					console.log('Displaying Main Page'+Posts);
					callback(null,Posts);
				});
	}
};

module.exports.PostApi = exports.PostApi = new PostApi();
