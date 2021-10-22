const functions = require("firebase-functions")
const express = require('express')
const cors = require('cors')
const { createUserItem } = require('./src/items')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/items', createUserItem)

exports.app = functions.https.onRequest(app)
