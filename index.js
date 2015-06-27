var db =require('./db'),
	express = require('express'),
	path = require('path'),
	app = express(),
	cool = require('cool-ascii-faces'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

routes(app);

app.set('port', (process.env.PORT || 5000));


app.listen(app.get('port'), function() {
  console.log("Node app is running on port:" + app.get('port'));
});
