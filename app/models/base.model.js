var BaseModel = {};

//BaseModel Utilities
BaseModel.getById = function(table, filter, callback) {
    winston.info('BaseModel - getById [table: %s |filter: %s]', table, util.inspect(filter))

    r.table(table).get(filter).run(dbConnection, function(err, result) {
        if (err) 
        {
            winston.error('Error BaseModel - getById [Error: %s]', util.inspect(err))
            callback(err, null)
        } 
        else
            callback(null, result)
    });
}

BaseModel.getByFilter = function(table, filter, callback) {
    winston.info('BaseModel - getByFilter [table: %s |filter: %s]', table, util.inspect(filter))

    r.table(table).filter(filter).run(dbConnection, function(err, cursor) {
        if (err) 
        {
            winston.error('Error BaseModel - getByFilter [Error: %s]', util.inspect(err))
            callback(err, null)
        } 
        else 
        {
            cursor.toArray(function(err, result) {
                if (err) 
                {
                    winston.error('Error BaseModel - getByFilter toArray [Error: %s]', util.inspect(err))
                    callback(err, null)
                }
                callback(null, result)
            });
        }
    });
}

BaseModel.getAll = function(table, filter, callback) {
    winston.info('BaseModel - getAll [table: %s| filter: %s]', table, util.inspect(filter))

    r.table(table).filter(filter).run(dbConnection, function(err, cursor) {
        if (err) 
        {
            winston.error('Error BaseModel - getAll [Error: %s]', util.inspect(err))
            callback(err, null)
        } 
        else 
        {
            cursor.toArray(function(err, result) {
                if (err) 
                {
                    winston.error('Error BaseModel - getAll toArray [Error: %s]', util.inspect(err))
                    callback(err, null)
                }
                callback(null, result)
            });
        }
    });
}

BaseModel.create = function(table, data, callback) {
    winston.info('BaseModel - create [table: %s |data: %s]', table, util.inspect(data))

    r.table(table).insert(data).run(dbConnection, function(err, result) {
        if (err) 
        {
            winston.error('Error BaseModel - create [Error: %s]', util.inspect(err))
            callback(err, null)
        } 
        else 
            callback(null, result)
    });
}

BaseModel.update = function(table, data, callback) {
    winston.info('BaseModel - update [table: %s |data: %s]', table, util.inspect(data))

    r.table(table).update(data).run(dbConnection, function(err, result) {
        if (err) 
        {
            winston.error('Error BaseModel - update [Error: %s]', util.inspect(err))
            callback(err, null)
        } 
        else 
            callback(null, result)
    });
}

BaseModel.updateById = function(table, data, callback) {
    winston.info('BaseModel - updateById [table: %s |data: %s]', table, util.inspect(data))

    r.table(table).get(data.id).update(data).run(dbConnection, function(err, result) {
        if (err) 
        {
            winston.error('Error BaseModel - updateById [Error: %s]', util.inspect(err))
            callback(err, null)
        } 
        else 
            callback(null, result)
    });
}

BaseModel.updateByFilter = function(table, filter, data, callback) {
    winston.info('BaseModel - updateByFilter [table: %s |data: %s]', table, util.inspect(data))

    r.table(table).filter(filter).update(data).run(dbConnection, function(err, result) {
        if (err) 
        {
            winston.error('Error BaseModel - updateByFilter [Error: %s]', util.inspect(err))
            callback(err, null)
        } 
        else 
            callback(null, result)
    });
}

BaseModel.delete = function(table) {
    winston.info('BaseModel - delete [table: %s]', table)

    r.table(table).delete().run(dbConnection, function(err, result) {
        if (err) 
        {
            winston.error('Error BaseModel - delete [Error: %s]', util.inspect(err))
            callback(err, null)
        } 
        else 
            callback(null, result)
    });
}

BaseModel.deleteById = function(table, id) {
    winston.info('BaseModel - deleteById [table: %s]', table)

    r.table(table).get(id).delete().run(dbConnection, function(err, result) {
        if (err) 
        {
            winston.error('Error BaseModel - deleteById [Error: %s]', util.inspect(err))
            callback(err, null)
        } 
        else 
            callback(null, result)
    });
}

BaseModel.deleteByFilter = function(table, filter) {
    winston.info('BaseModel - deleteByFilter [table: %s]', table)

    r.table(table).filter(filter).delete().run(dbConnection, function(err, result) {
        if (err) 
        {
            winston.error('Error BaseModel - deleteByFilter [Error: %s]', util.inspect(err))
            callback(err, null)
        } 
        else 
            callback(null, result)
    });
}

module.exports = BaseModel;