var UserModel = {},
    BaseModel = require('../models/base.model');

UserModel.getUser = function(table, filter, callback) {
    winston.info('UserModel - getUser [filter: %s]', util.inspect(filter))

    BaseModel.getById(table, filter, function(err, response) {
    	if (err) 
    	{
    		winston.error('UserModel - getUser [Error: %s]', util.inspect(err))
    		callback(err, null)
    	}
    	else
        	callback(null, response)
    })
};

UserModel.getUserList = function(table, filter, callback) {
    winston.info('UserModel - getUserList [table: %s |filter: %s]', table, util.inspect(filter))

    BaseModel.getAll(table, filter, function(err, response) {
        if (err) 
    	{
    		winston.error('UserModel - getUserList [Error: %s]', util.inspect(err))
    		callback(err, null)
    	}
    	else
        	callback(null, response)
    })
};

UserModel.findUser = function(table, filter, callback) {
	winston.info('UserModel - findUser [table: %s |filter: %s]', table, util.inspect(filter))

	BaseModel.getByFilter(table, filter, function(err, response) {
        if (err) 
    	{
    		winston.error('UserModel - findUser [Error: %s]', util.inspect(err))
    		callback(err, null)
    	}
    	else
        	callback(null, response)
    })
};

UserModel.createUser = function(table, data, callback) {
	winston.info('UserModel - createUser [table: %s |data: %s]', table, util.inspect(data))

	BaseModel.create(table, data, function(err, response) {
        if (err) 
    	{
    		winston.error('UserModel - createUser [Error: %s]', util.inspect(err))
    		callback(err, null)
    	}
    	else
        	callback(null, response)
    })
};

UserModel.updateUser = function(table, data, callback) {
	winston.info('UserModel - updateUser [table: %s |data: %s]', table, util.inspect(data))

	BaseModel.updateById(table, data, function(err, response) {
        if (err) 
    	{
    		winston.error('UserModel - updateUser [Error: %s]', util.inspect(err))
    		callback(err, null)
    	}
    	else
        	callback(null, response)
    })
};

UserModel.deleteUser = function(table, data, callback) {
	winston.info('UserModel - deleteUser [table: %s |data: %s]', table, util.inspect(data))
	
	BaseModel.updateById(table, data, function(err, response) {
        if (err) 
    	{
    		winston.error('UserModel - deleteUser [Error: %s]', util.inspect(err))
    		callback(err, null)
    	}
    	else
        	callback(null, response)
    })
};

UserModel.updateAllUser = function(table, data, callback) {
	winston.info('UserModel - updateAllUser [table: %s |data: %s]', table, util.inspect(data))
	
	BaseModel.update(table, data, function(err, response) {
        if (err) 
    	{
    		winston.error('UserModel - updateAllUser [Error: %s]', util.inspect(err))
    		callback(err, null)
    	}
    	else
        	callback(null, response)
    })
};

module.exports = UserModel;