var fs = require('fs');
var mongoose = require('mongoose');
//register all models
var models = fs.readdirSync('./models');
models.forEach(function(model) {
	require('./models/' + model);
	console.log('model: ' + model + ' loaded');
});

var url = (process.env.NODE_ENV === 'production') ?  process.env.MONGOLAB_URI: 'mongodb://localhost/banga';

console.log('Connecting to DB...');

var dbConnectionPromise = new Promise(function(resolve, reject){
	mongoose.connect(url, function (err, res) {
	  if (err) {
	    console.log ('ERROR connecting to: ' + url + '. ' + err);
		reject(err);
	  } else {
	    console.log ('Succeeded connected to: ' + url);
		resolve('connected');
	  }
	});
});

module.exports = exports = dbConnectionPromise;
