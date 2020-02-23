const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    mobileNumber : Number,
    date : new Date(),
    orderId : String,
    status : String,
    amount : Number,
    gatewayResponse : {

    },
    refund : Boolean
});

exports.Payment = mongoose.model('Payment', paymentSchema);