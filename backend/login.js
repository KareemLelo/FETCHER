import { MongoClient } from 'mongodb';
import express from 'express';
import cors from 'cors';

const uri = "mongodb+srv://banaalhawadya:BZKMONGO@cluster0.gb0y35r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // This is the client's URL
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
app.use(cors(corsOptions));  // Use CORS if your React app is served from a different origin
app.use(express.json()); // For parsing application/json

// Handle login POST request
app.post('/login', (req,res) => {
  const { username, password } = req.body;
  console.log('Received login for:', username, 'with password:', password);

  async function main() {
    // Create a new MongoClient
    const client = new MongoClient(uri);
  
    try 
    {
        // Use connect method to connect to the server
        await client.connect();
        //console.log('Connected successfully to MongoDB server');
        console.log("Connected to mongodb");     

        const database = client.db("BZKdatabase"); // Ensure this is your correct DB name
        const collection = database.collection("BZKUsers"); // Adjust to your collection name

        /*const query = {}; // Use an empty query to select all documents
        const options = {
            // sort returned documents in ascending order by title (optional)
            sort: { username: 1 },
            // Include only the `username` and `password` fields in each returned document (optional)
            projection: { username: 1, password: 1 },
        };
        const accounts = collection.find(query, options);
        var login= false;
        console.log("test uname:",username," pass:", password)
        for await (const account of accounts){
            if(account.username==username && account.password==password)
            {
                console.log('successful login');
                res.status(200).json({ message: "Successfully logged in"});
                login=true;
            }
        }
        if(login==false)
        {
            res.status(500).json({ message: "Invalid Username or Password"});
        }*/
        const user = await collection.findOne({
            username: username,
            password: password
        });
        if(user)
        {// Found a user matching the credentials
            console.log('successful login for:', username);
            res.status(200).json({ message: "Successfully logged in" });
        }
        else
        {
            // No user found with these credentials
            console.log('login failed for:', username);
            res.status(401).json({ message: "Invalid Username or Password" });
        }
    } catch (error)
    {
        console.error(error);
        res.status(500).json({ message: "An error occurred during the login process" });
    } finally 
    {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  
  main().catch(console.error);
});


// Define the port to listen on
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
