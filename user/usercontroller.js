const usermodel = require('./usermodel');
const error = require('./error');
const crypt = require('./crypt');
const jwt = require('./jwt');
const User = usermodel.User;

exports.createUser = async function(user) {
	user.password = crypt.encryptPassword(user.password);
	if (user.email != null)
		user.email = user.email.toLowerCase();
	user.lastLoggedIn = null;
	user.createdOn = Date.now();
	var u = new User(user);
	doc = await u.save();
	if (!doc)
		throw new Error(error.INTERNAL_ERROR);
	delete user.password;
	return {"user": user}
}

exports.login = async function(creds) {
	if (typeof creds.id == "number") {
		id = { mobileNumber : creds.id };
	} else if (typeof creds.id == "string") {
		creds.id = creds.id.toLowerCase();
		id = { email: creds.id }
	} else
		throw new Error( error.INVALID_CREDS );

	doc = await User.findOne(id);
	if (doc != null && creds.password == crypt.decryptPassword(doc.password)) {
		var token = await jwt.sign(creds.id).catch(function(err) {throw err;});
		doc = await User.findOneAndUpdate(id, {lastLoggedIn: Date.now()});
		if (!doc) {
			await jwt.destroy(token).catch(function(err) {throw err;});
			throw new Error(error.INTERNAL_ERROR);
		}
		return {"jwtoken": token};
	}
	throw new Error( error.INVALID_CREDS );
}

exports.logout = async function(token) {
	await jwt.destroy(token).catch(function(err) {throw err;});
};