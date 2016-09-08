var config    = require('../../config/config');

// HASS PASSWORD
exports.hashPassword = function(password, callback) {
    bcrypt.hash(password, null, null, function(err, hash) {
        if (err) return callback(true, null);

        callback(null, hash);
    });
};

// COMPARE HASH PASSWORD
exports.comparePassword =function(user, password) {
    return bcrypt.compareSync(password, user.password);
};