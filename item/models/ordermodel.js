const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    mobileNumber: Number,
    email : String,
    address : String,
    latitude : Number,
    longitude : Number,
    orderItems : [
        {
            name : String,
            itemId : ObjectId,
            Quantity : Number,
            price : Number,
            additionalHint : String,
            discounted : String,
        }
    ],
    numberOfCupsRequired : Number,
    status : String,
    paymentStatus: String,
    mode : String,
    deliveryBoyAlignedID : ObjectId,
    serviceMode: String,
    feedback : String,
    rating : Number,
    deliverypointId : ObjectId,
    cancelledTime :  Date,
    reasonOfcancellation : String
});

exports.Order = mongoose.model('Order', orderSchema);