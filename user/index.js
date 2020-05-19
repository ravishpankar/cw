const mongoose = require('mongoose');
const error = require('./error');
const jwt = require("./jwt");
const otp = require("./otp");
const uc = require("./usercontroller");
const config = require('config');
const express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json());

function init() {
    try {
        mongoose.connect(config.get('dbConfig').connectionString, {useNewUrlParser: true});
    } catch(err) {
        console.log(err);
        process.exit(-1);
    }
    mongoose.connection.on('error', error.mongooseErrHandler);
    mongoose.connection.on('connected', function () {
        console.log('Mongoose connection open to ' + config.get('dbConfig').connectionString);
    });
    mongoose.connection.on('open', function () {
        var um = require('./usermodel');
        um.User.on('index', function(err) {
            if (err) {
                console.log(err);
                process.exit(-1)
            }
            jwt.init();
            app.listen(3000, () => {
                console.log("User microservice running on port 3000");
            });
        });
    });
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose connection disconnected');
    });
    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.log('Mongoose connection disconnected through app termination');
        });
    });
}

init();

app.post('/user', async function (req, res) {
    try {
        res.status = 200
        res.send(JSON.stringify(await uc.createUser(req.body).catch(function(err) {error.returnError(res, err);})));
    } catch(err) {
        error.returnError(res, err);
    }
});

app.post('/login', async function (req, res) {
    try {
        res.status = 200
        res.send(JSON.stringify(await uc.login(req.body).catch(function(err) {error.returnError(res, err);})));
    } catch(err) {
        error.returnError(res, err);
    }
});


//todo: delete, destroytoken and get token from auth header
app.delete('/logout/:jwtoken', async function (req, res) {
    try {
        res.status = 200;
        await uc.logout(req.params.jwtoken).then(function() {res.send();}).catch(function(err) {error.returnError(res, err);});
    } catch(err) {
        error.returnError(res, err);
    }
});

app.get('/otp/:mobileNumber', function (req, res) {
   try {
       otp.sendOtpTo(res, req.params.mobileNumber);
   } catch(err) {
       error.returnError(res, err);
   }
});

app.get('/otp/:mobileNumber/:otp', function (req, res) {
    try {
        otp.verifyOtp(res, req.params.mobileNumber, req.params.otp);
    } catch(err) {
        error.returnError(res, err);
    }
});
