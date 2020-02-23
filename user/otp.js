const SendOtp = require('sendotp');
const config = require('config');
const error = require('./error');
const sendOtp = new SendOtp(config.get('otpConfig').auth_key, config.get('otpConfig').msg_template);

sendOtp.setOtpExpiry(config.get('otpConfig').otp_expiration);

exports.sendOtpTo = function(res, phoneNo) {
    sendOtp.send(phoneNo, config.get('otpConfig').sender_id, "12345",function(err, data){
        if (data && data.type == "error") {
            error.returnError(res, new Error(data.message));
        }
        else {
            res.status = 200;
            res.send();
        }
        console.log(data)
    });
}

exports.verifyOtp = function(res, phoneNo, otp) {
    sendOtp.verify(phoneNo, otp, function(err, data){
        if (data && data.type == "error") {
            error.returnError(res, new Error(data.message));
        }
        else {
            res.status = 200;
            res.send();
        }
        console.log(data)
    });
}


