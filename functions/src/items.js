const { getClient } = require('./dbConnection')

exports.getUserItems = async (req, res) => {
  const { uid } = req.params
  const client = await getClient()
  const db = client.db('Honey-Do')
  const collection = db.collection('items')
  try {
    const results = collection.find({ 'uid': Number(uid) })
    const items = await results.toArray()
    res.send(items)
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.createUserItem = async (req, res) => {
  const {name, uid } = req.body
  if(!name || !uid) {
    res.status(401).send('Invalid request')
  }
  const client = await getClient()
  const db = client.db('Honey-Do')
  const collection = db.collection('items')
  const now =  new Date()
  const item = {
    name,
    uid,
    done: false,
    active: true,
    created_at: now,
    updated_at: now
  }
  try {
    const result = await collection.insertOne(item)
    item.id = result.insertedId
    res.status(201).send(item)
  } catch(error) {
    res.status(500).send(error)
  }
}