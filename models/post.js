var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Post = new Schema({
	created_on: {type:String},
	title: {type:String, required: true},
	mainbody:{type:String, required: true},
	author: {type:String, required: true},
	type: {type: String, required:true},
	tags: [{type: String}],
	price: {type: Number,default: 0},
	expiry_date: {type:String},
	expiry_time: {type:String},
	modified_at: { type: String},
});

module.exports = mongoose.model('Post', Post);
