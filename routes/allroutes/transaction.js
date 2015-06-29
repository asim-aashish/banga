var Transaction = require('mongoose').model('Transaction'),
	Post = require('mongoose').model('Post'),
	User = require('mongoose').model('User'),
	Notification = require('mongoose').model('Notification'),
	_ = require('underscore'),
	SessionApi = require('./../../api/sessionapi').SessionApi;
var Transactionroute = function () {};
Transactionroute.prototype.CreateTransactionfororange = function(req, res, next){
	var data = _.pick(req.body, _.keys(Transaction.schema.tree));
	data.created_on =(new Date()).valueOf().toString();
	console.log(data);
	Post.findById(data.offer_title, function (err, postdoc) {
		if(err) {return next(err);}
		else{
			data.seller_name = postdoc.author;
			User.findOne({username: data.buyer_name},function(err, userdoc){
				if(err){return next(err);}
				else if(data.email !== userdoc.buyer || data.buyer_phone !== userdoc.contact_no.toString()){
					return next(new Error('Could not find right User for input given by user'));
				}
				else {
					Transaction.create(data, function(err){
						if (err){
							console.log('Transaction:Failed');
							return next(err);
						}
						else{
							console.log('Transaction:Success');
							var ndata ={
								setter:data.buyer_name,
								getter:data.seller_name,
								mainbody:"You recieved a new order from "+ data.buyer_name +"on an opportunity",
								status:"orange",
								post_id:data.offer_title,
								created_on:data.created_on,
							};
							Notification.create(ndata, function(err){
								if (err){
									console.log('Notification creation:Failed with data: '+ ndata);
									return next(err);
								}
								else{
									console.log('Notification creation status:Success');
									User.findOne({username:ndata.getter},function(err, doc){
										if(err){return next(err);}
										doc.notification_no++;
										doc.save();
										next();
									});
								}
							});
						}
					});
				}
			});
		}
	});
};
Transactionroute.prototype.showTransactions = function(req, res, next){
	SessionApi.checkSessionId(req.headers.session_id, function(err, user){
		if(err){return next(err);}
		Transaction.find({buyer_name:user},function(err, userdocs){
			if(err){return next(err);}
			userdocs.sort({created_at: -1});
			Transaction.find({seller_name:user},function(err, sellerdocs){
				sellerdocs.sort({created_at: -1});
				res.json(_.union(userdocs,sellerdocs));
				next();
			});
		});
	});
};
module.exports.Transactionroute = exports.Transactionroute = new Transactionroute();
