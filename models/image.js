var mongoose = require('mongoose'),
	crate = require('mongoose-crate'),
	LocalFS = require('mongoose-crate-localfs');

var ImageSchema = new mongoose.Schema({
	title: String
});

ImageSchema.plugin(crate, {
	storage: new LocalFS({
		directory: '/public'
	}),
	fields: {
		attachment: {}
	}
});

var Image = mongoose.model('Image', ImageSchema);
