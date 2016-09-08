var passport  = require('passport'),
    UserModel = require('../app/models/users.model');

module.exports = function() {

    require('./strategies/local.js')();
    require('./strategies/facebook.js')();
};