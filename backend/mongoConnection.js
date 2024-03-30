import { MongoClient } from 'mongodb';
//import { createHash } from 'crypto';
const uri = "mongodb+srv://banaalhawadya:BZKMONGO@cluster0.gb0y35r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
  // Create a new MongoClient
  const client = new MongoClient(uri);

  try 
  {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    
    console.log("Connected to mongodb");        
    const database = client.db("testDB")
    const collection = database.collection("testC")
    
    const doc=
    {
      name: "Akram",
      age: 35,
      marital_status:"married"
    }
  
    const result = await collection.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
  
  }finally 
  {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

main().catch(console.error);
