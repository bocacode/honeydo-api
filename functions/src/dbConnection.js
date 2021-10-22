const { MongoClient } = require('mongodb')
const {dbConfig} = require('./dbConfig')

exports.dbConnection = new MongoClient(dbConfig.url)
