var UserModel      = require('../models/users.model'),
    baseController = require('./base.controller'),
    config         = require('../../config/config');

exports.authRegister = function(req, res) {
    winston.info('Controller Authentication - authRegister [req.body: %s] ', util.inspect(req.body));
    
    if (req.body.username) 
    {
        UserModel.findUser('tbl_Users', {username: req.body.username}, function(err, users) {
            if (err) 
            {
                winston.error('Controller Authentication - authRegister [Error: %s]', util.inspect(err));
                res.json({ code: 'InternalError', message: util.inspect(err) });
            } 
            else 
            {
                if (users.length > 0) 
                {
                    res.json({ message: 'Username already exists!' })
                }
                else
                {
                    baseController.hashPassword(req.body.password, function(err, hash) {
                        if (err) 
                            res.json({ code: 'InternalError', message: util.inspect(err) });
                        else
                        {
                            req.body.password = hash;

                            UserModel.createUser('tbl_Users', req.body, function(err, result) {
                                if (err) 
                                {
                                    winston.error('Controller Authentication - authRegister [Error: %s]', util.inspect(err));
                                    res.json({ code: 'InternalError', message: util.inspect(err) });
                                } 
                                else 
                                    res.json({ success: true })
                            })
                        }
                    });
                }
            }
        }); 
    }
    else
    {
        res.status(403).send({
            success: false,
            message: 'No username provided.'
        });
    }
}   

exports.tokenAuthentication = function(req, res, next) {
    winston.info('Controller Authentication - tokenAuthentication');
    //configure headers to allow requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token, Token, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS,POST');
    res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
    res.setHeader('Access-Control-Max-Age', '1000');

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) 
    {
        jwt.verify(token, config.SECRET, function(err, decoded) {
            if (err) 
            {
                res.status(403).send({
                    success: false,
                    message: 'Failed to authenticate token'
                });
            }
            else
            {
                req.decoded = decoded;
                next();
            }
        });
    }
    else
    {
        res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}
