var Notification = require('mongoose').model('Notification'),
	User = require('mongoose').model('User'),
	Post = require('mongoose').model('Post'),
	SessionApi = require('./../../api/sessionapi').SessionApi;
var Notificationroute = function () {};
Notificationroute.prototype.CreateNotificationforred = function(req, res, next) {
	var data ={
		post_id : req.body.post_id,
		status : req.body.status,
		created_on: (new Date()).valueOf().toString(),
	};
	console.log(data.post_id);
	console.log("checking session_id: " + req.headers.session_id);
	SessionApi.checkSessionId(req.headers.session_id, function(err, user){
		if(err){return next(err);}
		data.setter = user;
			if(data.status ==="red"){
				Post.findById(data.post_id, function(err, doc){
					if(err) {return next(err);}
					data.getter = doc.author;
					User.findOne({username:data.setter},function(err, doc){
						if(err){return next(err);}
						res.json([doc]);
					});
					data.mainbody = data.setter + " wants to get your opportunity";
					Notification.create(data, function(err){
						if (err){
							console.log('Notification creation:Failed with data: '+ data);
							return next(err);
						}
						else{
							console.log('Notification creation status:Success');
							User.findOne({username:data.getter},function(err, doc){
								if(err){return next(err);}
								doc.notification_no++;
								doc.save();
								next();
							});
						}
					});
				console.log("got data from req: "+data.setter+data.getter+data.status+data.post_id);
				});
			}
			else{
				next(new Error('data.status is not set right'));
			}
	});
};
Notificationroute.prototype.showNotifications = function(req, res, next){
	SessionApi.checkSessionId(req.headers.session_id, function(err, user){
		if(err){return next(err);}
		Notification.find({getter:user},function(err, docs){
			if(err){return next(err);}
			var Notify = docs;
			Notify.sort({created_at: -1});
			res.json(Notify);
			next();
		});
	});
};
module.exports.Notificationroute = exports.Notificationroute = new Notificationroute();
