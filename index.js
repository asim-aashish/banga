var db =require('./db'),
	express = require('express'),
	path = require('path'),
	app = express(),
	cool = require('cool-ascii-faces'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	routes = require('./routes'),
	aws = require('aws-sdk');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

routes(app);

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;
var url = (process.env.NODE_ENV === 'production') ?  process.env.MONGOLAB_URI: 'mongodb://localhost/banga';

app.set('port', (process.env.PORT || 5000));


app.listen(app.get('port'), function() {
  console.log("Node app is running on port:" + app.get('port'));
});
