const functions = require("firebase-functions")
const express = require('express')
const cors = require('cors')
const { createUserItem, getUserItems } = require('./src/items')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/items', createUserItem)
app.get('/items/:uid', getUserItems)

exports.app = functions.https.onRequest(app)
