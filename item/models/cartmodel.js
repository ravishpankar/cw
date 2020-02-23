const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    name : {type : String, required : true},
    itemId : {type : String, required : true},
    quantity : {type : Number, required : true},
    amount: {type : Number, required : true},
    serviceTax: {type : Number, required : true}
});

exports.Cart = mongoose.model('Cart', cartSchema);