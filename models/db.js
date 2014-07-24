var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new Db('bilibili', new Server('localhost', Connection.DEFAULT_PORT, {}), {safe: true});

