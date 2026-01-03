
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ejrry3218:JJkk7598%40%40@cluster0.4gferyr.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const collection = await client.db("test").collection('person');
    console.log("연결 오나료");
    
    await collection.insertOne({name : "andy", age : 20});
    console.log('andy 추가함');

    const documents = await collection.find({name:'andy'}).toArray();
    console.log("찾은 문서 : " , documents);

    await collection.updateOne({name:'andy'}, { $set: {age:13}});
    console.log('나이 수정함');

    const upatedDoc = await collection.find({name:'andy'}).toArray();
    console.log("수정된 문서 : ", upatedDoc);

    // await collection.deleteOne({name : 'andy'});
    // console.log('문서 삭제됨');

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
