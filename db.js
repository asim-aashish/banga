var fs = require('fs');
var mongoose = require('mongoose');
//register all models
var models = fs.readdirSync('./models');
models.forEach(function(model) {
	require('./models/' + model);
	console.log('model: ' + model + ' loaded');
});

var url = process.env.MONGOLAB_URI || 'mongodb://localhost/banga';

console.log('Connecting to DB...');
var db = mongoose.connection;
mongoose.connect(url);

var dbConnectionPromise = new Promise(function(resolve, reject){
	db.on('error', function(err){
		console.log('DB:Connect Error.', err);
		reject(err);
	});
	db.once('open', function(){
		console.log('DB:Connect Successful.');
		resolve('connected');
	});
});

module.exports = exports = dbConnectionPromise;
