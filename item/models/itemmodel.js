const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
				_id : String,
				name : {type : String, required : true},
				price : { type: Number, required : true },
				images : [
							{
								img : Buffer,
								imgType : String,
								capturedOn : Date
							}
						],
				description : { type : String, required : true },
				rating : Number,// up to five
				availability : {type : Boolean, required : true},
				offer : String,
				category : { type : String, required : true },
				subscriptionAvailable : { type : Boolean, required : true },
				promocodeAvailable : String,
				videoLink : {
					video : Buffer,
					videoType : String
				},
				isDeleted : {type : Boolean, required : true }

});

exports.Item = mongoose.model('Item', itemSchema);
exports.LRL = 0;
exports.URL = 5;
exports.CTGY = ["Tea", "Breakfast", "Beverages"];