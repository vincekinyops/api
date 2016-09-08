var UserModel = require('../models/users.model'),
    passport  = require('passport'),
    baseController = require('./base.controller');

exports.getUserLoggedIn = function(req, res) {
    winston.info('Controller Users - getUserLoggedIn');

    res.send(req.decoded);
}

exports.getUser = function(req, res) {
    winston.info('Controller Users - getUser [req.query: %s] ', util.inspect(req.query));

    UserModel.getUser('tbl_Users', req.query.id, function(err, result) {
        if (err) 
        {
            winston.error('Controller Users - getUser [Error: %s]', util.inspect(err));
            res.json({ success: false, code: 'InternalError', message: util.inspect(err) });
        } 
        else 
            res.json(result);
    })
}

exports.getUserList = function(req, res) {
    winston.info('Controller Users - getUserList [req.query: %s]', util.inspect(req.query));

    UserModel.getUserList('tbl_Users', req.query, function(err, result) {
        if (err) 
        {
            winston.error('Controller Users - getUserList [Error: %s]', util.inspect(err));
            res.json({ success: false, code: 'InternalError', message: util.inspect(err) });
        } 
        else 
            res.json(result);
    })
}

exports.updateUser = function(req, res) {
    winston.info('Controller Users - updateUser [req.body: %s] ', util.inspect(req.body));

    if (Object.keys(req.body).length == 0) 
    {
        res.json({
            success: false,
            message: 'Missing fields'
        });
    }
    else
    {
        if (!req.body.id) 
        {
            res.json({
                success: false,
                message: 'ID is required.'
            });
        }
        else
        {
            if (req.body.password) 
            {
                baseController.hashPassword(req.body.password, function(err, hash) {
                    if (err) 
                        res.json({ code: 'InternalError', message: util.inspect(err) });
                    else
                    {
                        req.body.password = hash;

                        UserModel.updateUser('tbl_Users', req.body, function(err, result) {
                            if (err) 
                            {
                                winston.error('Controller Users - updateUser with password [Error: %s]', util.inspect(err));
                                res.json({ success: false, code: 'InternalError', message: util.inspect(err) });
                            } 
                            else 
                                res.json({ success: true })
                        });
                    }
                });
            }
            else
            {
                UserModel.updateUser('tbl_Users', req.body, function(err, result) {
                    if (err) 
                    {
                        winston.error('Controller Users - updateUser [Error: %s]', util.inspect(err));
                        res.json({ success: false, code: 'InternalError', message: util.inspect(err) });
                    } 
                    else 
                        res.json({ success: true })
                });
            }
        }
    }
}

exports.deleteUser = function(req, res) {
    winston.info('Controller Users - deleteUser [req.body: %s] ', util.inspect(req.body));

    if (Object.keys(req.body).length == 0) 
    {
        res.json({
            success: false,
            message: 'Missing fields'
        });
    }
    else
    {
        if (!req.body.id) 
        {
            res.json({
                success: false,
                message: 'ID is required.'
            });
        }
        else
        {
            req.body.user_status = "in_active";

            UserModel.deleteUser('tbl_Users', req.body, function(err, result) {
                if (err) 
                {
                    winston.error('Controller Users - deleteUser [Error: %s]', util.inspect(err));
                    res.json({ success: false, code: 'InternalError', message: util.inspect(err) });
                } 
                else 
                    res.json({ success: true })
            });
        }
    }
}

// functions to be use for emergency only
exports.updateAllUser = function(req, res) {
    winston.info('Controller Users - updateAllUser [req.body: %s] ', util.inspect(req.body));

    req.body.user_status = "active";

    UserModel.updateAllUser('tbl_Users', req.body, function(err, result) {
        if (err) 
        {
            winston.error('Controller Users - updateAllUser [Error: %s]', util.inspect(err));
            res.json({ success: false, code: 'InternalError', message: util.inspect(err) });
        } 
        else 
            res.json({ success: true })
    })
}

exports.createUser = function(req, res) {
    res.json(req.body)
}