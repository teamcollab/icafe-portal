var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

var config = require('../../config/config');
var options = { // TODO -- pull from config
    dialect: "mysql",
    port:    3306
};

var mysql = config.mysql

console.log("mysql", mysql);
var client = new Sequelize(mysql.dbname, mysql.username, mysql.password, options);
var models = {};

// read all models and import them into the "db" object
fs
    .readdirSync(__dirname + '/models')
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function (file) {
        var model = client.import(path.join(__dirname + '/models', file));
        models[model.name] = model;
    });

Object.keys(models).forEach(function (modelName) {
    if (models[modelName].options.hasOwnProperty('associate')) {
        models[modelName].options.associate(models);
    }
});

module.exports = models;
module.exports.client = client;
