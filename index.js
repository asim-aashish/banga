	var db =require('./db'),
	express = require('express'),
	path = require('path'),
	app = express(),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

routes(app);

var server = app.listen(3030, function () {
	var port = server.address().port;

	console.log('Banga app listening at port '+ port);

});