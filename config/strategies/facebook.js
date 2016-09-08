var FacebookStrategy = require('passport-facebook').Strategy,
    config           = require('../config'),
    baseController   = require('../../app/controllers/base.controller'),
    UserModel        = require('../../app/models/users.model');

module.exports = function() {
    winston.info('STRATEGY FACEBOOK');
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            profileFields: ['id', 'displayName', 'photos', 'gender', 'name'],
            email: 'email',
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {

            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

            console.log(' profile ---------- ', profile)

            var providerUserProfile = {
                firstName: providerData.first_name,
                lastName: providerData.last_name,
                fullName: profile.displayName,
                email: "",
                username: profile.username,
                provider: 'facebook',
                providerId: profile.id,
                providerData: providerData
            };
            
            saveOAuthUserProfile(req, providerUserProfile, done);
        }
    ));

    //INTERNAL FUNCTIONS FOR SAVING/CREATING UNIQUE USERNAMES FOR OAUTH
    function findUniqueUsername(username, suffix, callback) {
        winston.info('INTERNAL OAUTH - findUniqueUsername');

        var possibleUsername = username + (suffix || '');

        UserModel.findUser('tbl_Users', {username: username}, function(err, result) {
            if (!err) 
            {
                var user = result[0];

                if (!user) {
                    callback(possibleUsername);
                } else {
                    return findUniqueUsername(username, (suffix || 0) + 1, callback);
                }
            }
            else
                callback(null);
        });
    };

    function saveOAuthUserProfile(req, profile, done) {
        winston.info('INTERNAL OAUTH - saveOAuthUserProfile');

        var query = {
            provider: profile.provider,
            providerId: profile.providerId
        }

        UserModel.findUser('tbl_Users', query, function(err, result) {
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

                    var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

                    findUniqueUsername(possibleUsername, null, function(availableUsername) {
                        profile.username = availableUsername;
                        
                        user = new User(profile);

                        UserModel.createUser('tbl_Users', user, function(err, response) {

                            var token = jwt.sign({
                                name: profile.first_name + " " + profile.last_name,
                                username: profile.username
                            }, config.SECRET, {
                                expiresIn: '24h'
                            });

                            user.success = true;
                            user.token = token;
                            
                            return done(err, user);
                        });
                    });
                }
                else
                    return done(err, result);
            }
        });
    }
};
