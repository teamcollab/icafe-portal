"use strict"
path = require("path")
_ = require("lodash")
os = require('os');
console.log "process.env.NODE_ENV", process.env.NODE_ENV
env = process.env.NODE_ENV = process.env.NODE_ENV or "development"
base =
  app:
    root: path.normalize(__dirname + "/..")
    env: env

specific =
  development:
    app:
      port: 3000
      name: "icafe - Dev"
      keys: ["super-secret-hurr-durr"]
      file:
        path: os.tmpdir()

    mysql:
      dbname: 'blogs_db',
      username: "root",
      password: "mvagusta"
      force: true

  test:
    app:
      port: 3001
      name: "icafe - Test realm"
      keys: ["super-secret-hurr-durr"]
      file:
        path: "#{base.app.root}/test/upload"


    mysql:
      dbname: 'blogs_db',
      username: "root",
      password: "mvagusta"
      force: true

  production:
    app:
      port: process.env.PORT or 3000
      keys: ["super-secret-hurr-durr"]
      name: "icafe"

    mysql:
      dbname: 'icafe',
      username: "root",
      password: process.env.MYSQL_ENV_MYSQL_ROOT_PASSWORD || "root"
      force: false

module.exports = _.merge(base, specific[env])
