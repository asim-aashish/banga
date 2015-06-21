var crypto = require('crypto'),
	Session = require('mongoose').model('Session');
var SessionApi = function(){};
	SessionApi.prototype.startSession = function(username, callback) {
		// Generate session id
		var current_date = (new Date()).valueOf().toString();
		var random = Math.random().toString();
		var session_id = crypto.createHash('sha1').update(current_date + random).digest('hex');

		// Create session document
		var sessionbox = {'session_id': session_id,'username': username};
		console.log(sessionbox);
		// Insert session document
		Session.create(sessionbox, function(err){
			if (err){
				console.log('Session creation :Failed: ', err);
				next(err);
			}
			else{
				//create session id
				console.log('Session creation:Success')
				callback(sessionbox);
			}
		});
	}
	SessionApi.prototype.checkSessionId = function (session_id ,callback){
		if (!session_id) {
			return callback(new Error('Session not started, redirect to login/register page'),null);
		}
		Session.findOne({ 'session_id' : session_id }, function(err, session) {
			if (err) return callback(err,null);
			if (!session) {
				return callback(new Error("Session: " + session_id + " does not exist"),null);
			}
			else if(!session.username){
				return callback(new Error("No username found for this session_id: "+session_id),null);
			}
			else{
				var bela = session.username;
				console.log("found username: "+bela);
				return callback(null, bela);
			}
		});
	}
module.exports.SessionApi = exports.SessionApi = new SessionApi;


