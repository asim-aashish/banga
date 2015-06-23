var SessionApi = require('../api/sessionapi').SessionApi,
	Notification = require('mongoose').model('Notification');

var NotificationApi =function () {};

NotificationApi.prototype.CreateNotification = function(req, res, next) {
	var data ={
		data.session_id = req.headers.session_id,
		data.post_id = req.body.post_id,
		data.status = req.body.status,
		created_at: (new Date()).toDateString(),
	}
	console.log("got data from req: "+data);
	console.log("checking session_id: " + data.session_id);
	SessionApi.checkSessionId(data.session_id, function(err, user){
		if(err){next(err);}
		else{
			if(data.status === "pending"||data.status ==="done"){
				data.author = user,
				data.mainbody = (data.status ==="pending")?(user + " wants to get your opportunity"):("your order with "+user+" is now complete");
				Notification.create(data, function(err){
					if (err){
						console.log('Notification creation:Failed with data: '+notificationData);
						next(err);
					}
					else{
						console.log('Notification creation status:Success');
						res.json([{status:"ok"}]);
						next();
					}
				});
			}
			else{
				console.log("data status is " + data.status + "which is not equal to 'pending' or 'done'");
				next(new Error("data status is " + data.status + "which is not equal to 'pending' or 'done'"));
			}
		}
	});
}
NotificationApi.prototype.showNotifications = function(req, res, next){
	
}

module.exports.NotificationApi = exports.NotificationApi = new NotificationApi;
