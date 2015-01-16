"use strict"
path = require("path")
_ = require("lodash")
os = require('os');
console.log "process.env.NODE_ENV", process.env.NODE_ENV
env = process.env.NODE_ENV = process.env.NODE_ENV or "development"
username = process.env.MYSQL_ENV_MYSQL_USER || "root"
password = process.env.MYSQL_ENV_MYSQL_ROOT_PASSWORD || ""
filepath = process.env.UPLOAD_FILE_PATH || os.tmpdir()

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
      dbname: 'icafe_dev',
      username: username,
      password: password
      force: true

  test:
    app:
      port: 3001
      name: "icafe - Test realm"
      keys: ["super-secret-hurr-durr"]
      file:
        path: "#{base.app.root}/test/upload"


    mysql:
      dbname: 'icafe_test',
      username: username,
      password: password
      force: true

  production:
    app:
      port: process.env.PORT or 3000
      keys: ["super-secret-hurr-durr"]
      name: "icafe"
      file:
        path: os.tmpdir()

    mysql:
      dbname: 'icafe_portal',
      username: username,
      password: password
      force: false



module.exports = _.merge(base, specific[env])
