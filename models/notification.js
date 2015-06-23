var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Notification = new Schema({
	author: {type:String, required: true},
	mainbody:{type:String, required: true},
	status: {type: String, required:true},
	post_id:{type: String, required:true},
	created_at: Date,
});

module.exports = mongoose.model('Notification', Notification);