exports.mongooseErrHandler = function(err) {
	throw err;		
}

exports.returnError = function(res, err) {
	res.status = 500;
	res.send(JSON.stringify({'error' : err.toString()}));
}


exports.INVALID_CREDS = "Invalid user id or password";
exports.INTERNAL_ERROR = "An internal error occurred";