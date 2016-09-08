var config = require('../../config/config');

module.exports = function(express) {
    winston.info('API ROUTES - INITIALIZED');

    var apiRouter = express.Router();

    var authController = require('../controllers/auth.controller');
    var usersController = require('../controllers/users.controller');

    // // AUTHENTICATION 
    // apiRouter.post('/authenticate', function(req, res) {
    //     passport.authenticate('local', function(err, user, info) {
    //         if (err)
    //             res.status(500).send({
    //                 message: util.inspect(err)
    //             })
    //         else if (!user)
    //             res.status(403).send(info);
    //         else
    //             res.status(200).send(user);
    //     })(req, res);
    // });

    // apiRouter.get('/oauth/facebook/callback', function(req, res) {
    //     passport.authenticate('facebook', {
    //         scope: ['user_about_me', 'public_profile', 'email']
    //     }, function(err, user, info) {
    //         if (err)
    //             res.status(500).send({
    //                 message: util.inspect(err)
    //             })
    //         else if (!user)
    //             res.status(403).send(info);
    //         else
    //             res.status(200).send(user);
    //     })(req, res);
    // });

    // apiRouter.post('/register', authController.authRegister);

    // HANDLE API TOKEN AUTH
    // apiRouter.use(authController.tokenAuthentication);

    // USERS
    apiRouter
        .post('/user', usersController.createUser)
        .get('/user', usersController.getUser)
    // apiRouter.get('/user', usersController.getUser);
    apiRouter.get('/users', usersController.getUserList);
    apiRouter.put('/users', usersController.updateUser);
    apiRouter.delete('/user', usersController.deleteUser);

    // ROUTE TO GET USER LOGGED IN INFORMATION
    apiRouter.get('/me', usersController.getUserLoggedIn);

    return apiRouter;

};