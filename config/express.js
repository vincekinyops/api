var express = require('express'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    config = require('../config/config.js')
    cors = require('cors');

module.exports = function() {

    var app = express();

    app.use(cors());

    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // REQUIRE ROUTES HERE
    var apiRoutes = require('../app/routes/routes')(express);

    app.use('/api', apiRoutes);

    return app;
}
