var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	contact_no: { type:Number, required: true, unique:true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique:true },
	password: {type: String},
	notification_no: {type: Number, default:0},
	created_on: {type: String},
	lastlogin: {type: String},
	lastdmpgreq: {type: String },

	modified_at: { type: String},
});

module.exports = mongoose.model('User', User);
