const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({ name : String, 
				mobileNumber : { type : Number, unique : true, required : true },
				email : { type : String, unique : true },
				profession : String,
				stayingWith : String,
				lastLoggedIn : Date,
				password : { type : String, required : true },
				createdOn : Date
			    });

exports.User = mongoose.model('User', userSchema);




