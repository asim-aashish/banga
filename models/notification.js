var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Notification = new Schema({
	title: {type:String, required: true},
	mainbody:{type:String, required: true},
	author: {type:String, required: true},
	type: [{type: String, required:true}],
	expiry: Date,
	created_at: Date,
});

module.exports = mongoose.model('Notification', Notification);