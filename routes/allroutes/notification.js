var Notification = require('mongoose').model('Notification'),
	User = require('mongoose').model('User'),
	Post = require('mongoose').model('Post'),
	SessionApi = require('./../../api/sessionapi').SessionApi;
var Notificationroute = function () {};
Notificationroute.prototype.CreateNotification = function(req, res, next) {
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
		if(data.status === "red"||data.status ==="orange"||data.status ==="green"&&data.post_id!==""){
			Post.findById(data.post_id, function(err, doc){
				if(err) {return next(err);}
				data.getter = doc.author;
				User.findOne({username:data.setter},function(err, doc){
					if(err){return next(err);}
					res.json([doc]);
				});
				if(data.status ==="red"){
					data.mainbody = data.setter + " wants to get your opportunity";
					Notification.create(data, function(err){
						if (err){
							console.log('Notification creation:Failed with data: '+data);
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
				}
				if(data.status ==="orange"){
					data.mainbody ="You received the order from "+data.setter;
				}
				if(data.status ==="green"){
					data.mainbody ="Your order with "+data.setter+" is now complete";
				}
				console.log("got data from req: "+data.setter+data.getter+data.status+data.post_id);
			});
		}
		else{
			console.log("data status is " + data.status + "which is not equal to 'pending' or 'done'");
			next(new Error("data status is " + data.status + "which is not equal to 'pending' or 'done'"));
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
