var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	contact_no: { type:Number, required: true, unique:true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique:true },
	password: String,
	created_at: Date,
	modified_at: { type: Date, default: Date.now},
});

module.exports = mongoose.model('User', User);