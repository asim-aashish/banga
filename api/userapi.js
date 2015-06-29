var SessionApi = require('../api/sessionapi').SessionApi,
	User = require('mongoose').model('User');

var UserApi = function (){};

UserApi.prototype.ValidateSignUp =function(data,callback){
	var USER_RE = /^[a-zA-Z0-9_-]{3,20}$/;
	var EMAIL_RE = /^[\S]+@[\S]+\.[\S]+$/;
	if (data.email !== "") {
		if (!EMAIL_RE.test(data.email)) {
			return callback(new Error("invalid Email Address"), false);
		}
		else{
			if(data.username !==""){
				if (!USER_RE.test(data.username)) {
					return callback(new Error("User name must be greater than 3 letters and less than 20"), false);
				}
				else{
					return callback(null ,true);
				}
			}
			else{
				return callback(new Error("User name is null"), false);
			}
		}
	}
	else{
		return callback(new Error("email is null"), false);
	}
};

module.exports.UserApi = exports.UserApi = new UserApi();
