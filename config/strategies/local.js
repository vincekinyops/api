var LocalStrategy   = require('passport-local').Strategy,
    config          = require('../config'),
    baseController  = require('../../app/controllers/base.controller'),
    UserModel       = require('../../app/models/users.model');

module.exports = function() {
    winston.info('STRATEGY LOCAL/JWT');
    passport.use(new LocalStrategy(function(username, password, done) {
        UserModel.findUser('tbl_Users', {username: username}, function(err, result) {
            if (err) 
            {
                winston.error('Controller Authentication - authLogin [Error: %s]', util.inspect(err));
                return done({ code: 'InternalError', message: util.inspect(err) });
            } 
            else 
            {
                if (result.length > 0) 
                {
                    user = result[0];

                    var isValid = baseController.comparePassword(user, password);
                    if (!isValid) 
                    {
                        return done(null, false, { 
                            success: false, 
                            message: 'Authentication failed. Wrong password.' 
                        });
                    }
                    else
                    {
                        var token = jwt.sign({
                            name: user.first_name + " " + user.last_name,
                            username: user.username 
                        }, config.SECRET, {
                            expiresIn: '24h'
                        });

                        return done(null, {
                            success: true,
                            message: 'Login Success',
                            token: token
                        });
                    }
                }
                else
                    return done(null, false, {success: false, message: "Authentication Failed. User not found."});
            }
        });
    }));
};