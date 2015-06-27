var crypto = require('crypto'),
	Session = require('mongoose').model('Session');
var SessionApi = function(){};
	SessionApi.prototype.startSession = function(username, callback) {
		// Generate session id
		var current_date = (new Date()).valueOf().toString();
		var random = Math.random().toString();
		var session_id = crypto.createHash('sha1').update(current_date + random).digest('hex');

		// Create session document
		var sessionbox = {'session_id': session_id,'username': username,'created_on': current_date};
		console.log(sessionbox);
		// Insert session document
		Session.create(sessionbox, function(err){
			if (err){
				console.log('Session creation :Failed: ', err);
				callback(err, null);
			}
			else{
				//create session id
				console.log('Session creation:Success');
				callback(null, sessionbox);
			}
		});
	};
	SessionApi.prototype.checkSessionId = function (session_id ,callback){
		if (!session_id) {
			return callback(new Error('Session not started, redirect to login/register page'),null);
		}
		else{
			Session.findOne({ 'session_id' : session_id }, function(err, session) {
				if (err) return callback(err,null);
				if (!session) {
					return callback(new Error("Session: " + session_id + " does not exist"),null);
				}
				else if(!session.username){
					return callback(new Error("No username found for this session_id: "+session_id),null);
				}
				else{
					var banga = session.username;
					console.log("found username: "+banga);
					return callback(null, banga);
				}
			});
		}
	};
	SessionApi.prototype.destroySession = function(session_id, callback){
		if (!session_id) {
			return callback(new Error('Session_id is null, no session_id sent'));
		}
		else{
			Session.remove({ session_id: session_id }, function(err) {
				if (err) {
						return callback(new Error("Error in removing session_id document"));
				}
				else {
					return callback(null);
				}
			});
		}
	};
module.exports.SessionApi = exports.SessionApi = new SessionApi();
