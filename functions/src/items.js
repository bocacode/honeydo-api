const { getClient } = require('./dbConnection')
const ObjectId = require('mongodb').ObjectId

exports.getUserItems = async (req, res) => {
  const { uid } = req.params
  const client = await getClient()
  const db = client.db('Honey-Do')
  const collection = db.collection('items')
  
  try {
    const results = collection.find({ 'uid': uid })
    const items = await results.toArray()
    res.send(items)
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.createUserItem = async (req, res) => {
  const { name, uid } = req.body
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

exports.updateItem = async (req, res) => {
  const { name, uid, done } = req.body
  const itemId = req.params.itemId

  if(!uid){
    res.status(401).send('Invalid Request')
  }

  const updateDoc = { updated_at: new Date()}
  
  if (name) {
    updateDoc.name = name
  }

  if (done) {
    updateDoc.done = done 
  }
  try {

    const itemCollection = await getItemCollection()
    const result = await itemCollection.updateOne(
    {'_id': new ObjectId(itemId), 'uid': uid }, 
    { $set: updateDoc})
    res.status(200).send(result)
    
  } catch (error) {
      console.log(error)
      res.status(500).send(error)
  }
  

}

exports.deactiveItem = async (req, res) => {
  console.log(req.params)
  const { itemId, uid } = req.params

  if(!uid || !itemId){
    res.status(500).send('Invalid Request')
  }

  try {
    const collection = await getItemCollection()
    //const result = await collection.updateOne({'_id': new ObjectId(itemId), 'uid': uid})
    const result = await collection.updateOne(
      {'_id': new ObjectId(itemId), 'uid': uid }, 
      { $set: {'active': false, 'updated_at': new Date()}})

      res.status(200).send(result)

  } catch (error) {
    res.status(500).send(error)
  }
}

async function getItemCollection() {
  const client = await getClient()
  const db = client.db('Honey-Do')
  const collection = db.collection('items')

  return collection
}
