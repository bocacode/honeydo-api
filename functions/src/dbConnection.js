const { MongoClient } = require('mongodb')
const {dbConfig} = require('./dbConfig')

const client = new MongoClient(dbConfig.url)

let isConnnected = false


exports.getClient = async () =>{

    if(!isConnnected){
        await client.connect()
    }

    return client

}
