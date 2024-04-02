import { MongoClient } from 'mongodb';
import express from 'express';
import cors from 'cors';

// Ensure your MongoDB URI is correctly configured and secured
const uri = "mongodb+srv://banaalhawadya:BZKMONGO@cluster0.gb0y35r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // This is the client's URL
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());

//console.log("test1")
app.post('/register', (req,res) => {
  //console.log(req.body);
  const {  firstName, lastName, email, accCategory, userName, password, mobile } = req.body;
  console.log('Received signup for:', email);
  async function main() {

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("connected to db")
    const database = client.db("testDB"); // Ensure this is your correct DB name
    const collection = database.collection("testSignup"); // Adjust to your collection name

    // Create a document to insert
    const doc = {
      firstName,
      lastName,
      email,
      accCategory,
      userName,
      password, // Remember to hash passwords in a real application
      mobile
    };

    const result = await collection.insertOne(doc);
    console.log(`A new user was inserted with the _id: ${result.insertedId}`);

    // Send a success response back to the client
    res.status(200).json({ message: "Signup successful", userId: result.insertedId });
  } catch (error) {
    console.error("Error during MongoDB operation", error);
    res.status(500).json({ message: "Error during signup" });
  } finally {
    await client.close();
  }
}
main().catch(console.error);
});

const PORT = 3500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});