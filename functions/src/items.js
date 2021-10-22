const { dbConnection } = require('./dbConnection')


exports.createUserItem = async (req, res) => {
  // do some stuff
  await dbConnection.connect()

  const db = dbConnection.db();
  const collection = db.collection('items');

  const {name, uid } = req.body

  const now =  new Date()

  const item = {
    name,
    done: false,
    uid,
    active: true,
    created_at: now,
    updated_at: now
  }

  try {

    const result = await collection.insertOne(item)
    item.id = result.insertedId
    res.status(201).send(item)

  } catch(error) {
     
    res.status(500).send("Something went wrong.")

  }
  

}