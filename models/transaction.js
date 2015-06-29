var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Transaction = new Schema({
	offer_title: {type:String, required: true},
	seller_name: {type:String, required:true},//added
	buyer_name: {type:String, required: true},
	variants: {type:String, required: true},
	mac: {type: String, required:true},
	buyer_phone: {type: String, required:true},
	shipping_country: {type: String, required:true},
	offer_slug: {type: String, required:true},
	fees: {type: String, required:true},
	shipping_city: {type: String, required:true},
	shipping_zip: {type: String, required:true},
	shipping_address: {type: String, required:true},
	payment_id: {type: String, required:true},
	shipping_state: {type: String, required:true},
	amount: {type: String, required:true},
	custom_fields: {type: String, required:true},
	quantity: {type: String, required:true},
	currency: {type: String, required:true},
	buyer: {type: String, required:true},
	unit_price: {type: String, required:true},
	created_on: {type:String},//added
});

module.exports = mongoose.model('Transaction', Transaction);
