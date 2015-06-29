var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Notification = new Schema({
	setter: {type:String, required: true},
	getter: {type:String, required: true},
	mainbody:{type:String, required: true},
	status: {type: String, required:true},
	post_id:{type: String, required:true},
	show:{type:Boolean ,required:true,default:true},
	created_on: {type:String},
});

module.exports = mongoose.model('Notification', Notification);
