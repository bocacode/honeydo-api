const functions = require("firebase-functions")
const express = require('express')
const cors = require('cors')
const { createUserItem, getUserItems, updateItem, deactiveItem } = require('./src/items')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/items', createUserItem)
app.get('/users/:uid/items', getUserItems)
app.patch('/items/:itemId', updateItem)
app.delete('/users/:uid/items/:itemId', deactiveItem)

exports.app = functions.https.onRequest(app)
