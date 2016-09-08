module.exports = function() {
	var credentials = {
	    host: nconf.get('DB_SERVER'),
	    port: nconf.get('DB_PORT'),
	    db: nconf.get('DB_NAME')
	}

	async.waterfall([
		// open the rethink connection
		function(callback) {
			r.connect(credentials, function(err, conn) {
				if (err) {
					winston.error('Initializers DB [Error: %s]', util.inspect(err));
					return callback(err, null)
				} else {
					winston.info('Server - DB Connection Opened');
					return callback(null, conn)
				}
			})
		},
		// check if the database already exists
		function(connection, callback) {
			r.dbList().run(connection, function(err, result) {
				if (err) {
					winston.error('Initializers DB [dbList] [Error: %s]', util.inspect(err))
					callback(err, null);
				} else {
					if (result && result.toString().indexOf(credentials.db) > -1) {
						winston.info('Initializers DB [Database already exists]');
						callback(null, connection);
					} else {
						winston.info('Initializers DB [Database not exists]');
						r.dbCreate(credentials.db).run(connection, function(err, result) {
							if (err) {
								winston.error('Initializers DB [dbCreate] [Error: %s]', util.inspect(err))
								callback(err, null);
							} else
								callback(null, connection);
						});
					}
				}
			});
		},
		// create table if not exist in the database
		function(connection, callback) {
			async.parallel({
				tbl_Driver: function(callback) {
					r.tableCreate('tbl_Driver').run(connection, function(err, result) {
						if (!err)
							winston.info('Initializers DB [tbl_Driver created]');
						// create status index
						r.table('tbl_Driver').indexCreate('status').run(connection, indexHandler.bind({
							name: 'status'
						}));
						callback(null, true);
					});
				},
				tbl_Taxi: function(callback) {
					r.tableCreate('tbl_Taxi').run(connection, function(err, result) {
						if (!err)
							winston.info('Initializers DB [tbl_Taxi created]');
						// create status index
						r.table('tbl_Taxi').indexCreate('body_number').run(connection, indexHandler.bind({
							name: 'body_number'
						}));
						callback(null, true);
					});
				},
				tbl_Dispatch: function(callback) {
					r.tableCreate('tbl_Dispatch').run(connection, function(err, result) {
						if (!err)
							winston.info('Initializers DB [tbl_Dispatch created]');
						// create status index
						r.table('tbl_Dispatch').indexCreate('status').run(connection, indexHandler.bind({
							name: 'status'
						}));
						callback(null, true);
					});
				},
				tbl_Rental: function(callback) {
					r.tableCreate('tbl_Rental').run(connection, function(err, result) {
						if (!err)
							winston.info('Initializers DB [tbl_Rental created]');
						// create status index
						r.table('tbl_Rental').indexCreate('status').run(connection, indexHandler.bind({
							name: 'status'
						}));
						callback(null, true);
					});
				}
			}, function(err, result) {
				if (err) {
					winston.error('Initializers DB [parallel] [Error: %s]', util.inspect(err));
					callback(err, null);
				} else
					callback(null, connection);
			});
		}
	], function(err, result) {
		if (err) {
			winston.error('Initializers DB [Error: %s]', util.inspect(err));
			return err;
		} else {
			winston.info('Initializers DB [Successfully]');
			return result;
		}
	})

	// internal function
	function indexHandler(err, response) {
		if (response)
			winston.info('%s index created', this.name);
	}
}