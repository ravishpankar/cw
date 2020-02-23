exports.mongooseErrHandler = function(err) {
	throw err;		
}

exports.returnError = function(res, err) {
	res.status = err.status;
	res.send(JSON.stringify({'error' : err.toString()}));
}


exports.INVALID_CREDS = "Invalid user id or password";
exports.INTERNAL_ERROR = "An internal error occurred";
exports.INVALID_RATING = "Invalid rating. Rating should be > {0} to {1}";
exports.INVALID_CATEGORY = "Invalid category. Category should be one of {0}";
exports.INVALID_PRICE = "Price cannot be negative";