var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Session = new Schema({
	session_id: { type: String, required: true, unique: true },
	username: { type: String, required: true },
	created_at: Date,
});

module.exports = mongoose.model('Session', Session);