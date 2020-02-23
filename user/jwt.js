const redis = require('redis');
const JWTR =  require('jwt-redis').default;
const config = require('config');
var redisClient = null;
var jwtr = null;
const secret = config.get('jwtConfig').secret;

exports.init = function() {
	if (!redisClient) {
		redisClient = redis.createClient({ port : config.get('jwtConfig').port, host : config.get('jwtConfig').host, password  : config.get('jwtConfig').password});
		redisClient.on('error', function (err) {
			console.error('Error ' + err);
			process.exit(-1);
		})
  	}
	jwtr = new JWTR(redisClient);
}

exports.sign = async function(userId) {
	return await jwtr.sign({"jti" : userId.toString()}, secret).then(function (token) {
			return token;
		}).catch(function (err) {
			throw err;
		});
}

exports.destroy = async function(token) {
	var jti = await jwtr.verify(token, secret).then(function (jti) {
		return jti;
	}).catch(function (err) {
			throw err;
	});
	await jwtr.destroy(jti).catch(function (err) {
		throw err;
	});
}




