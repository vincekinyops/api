var express = require('express'),
    winston = require('winston'),
    config = require('./config/config.js'),
    passport = require('./config/passport'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    cors = require('cors');

nconf.argv()
    .env()
    .add( 'global', { file: __dirname + '/config/environments/' + process.env.NODE_ENV + '.json',  type: 'file' })
    .add( 'user', { file: __dirname + '/config/environments/development.json', type: 'file' });

winston.remove(winston.transports.Console);
var logger = winston.add(winston.transports.Console, {
    timestamp: true,
    colorize: true
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
};

var self = this;

global.r = require('rethinkdb');
global.winston = require('winston');
global.async = require('async');
global._ = require('underscore');
global.util = require('util');
global.passport = require('passport');
global.jwt = require('jsonwebtoken');
global.bcrypt = require('bcrypt-nodejs');
global.nconf = require('nconf');
db = require('./config/db');
global.connection = db.call(self);

var api = config.DB_SERVER,
    port = config.DB_PORT;

// var passport = passport();

var app = express();

app.use(cors());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// REQUIRE ROUTES HERE
var apiRoutes = require('./app/routes/routes')(express);

app.use('/api', apiRoutes);
var port = 8002;
app.listen(port, function() {
    winston.info('API - Initialized listening at port %s ', port)
});