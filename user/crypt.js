const Cryptr = require('cryptr');
const config = require('config');
const cryptr = new Cryptr(config.get("cryptConfig").secret);

exports.encryptPassword = function(password) {
	return cryptr.encrypt(password);
}

exports.decryptPassword = function(password) {
	return cryptr.decrypt(password);
}