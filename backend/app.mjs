import express from "express";
//import authRoutes from './routes/authRoutes.mjs';
import mongoose from "mongoose";
import userRoutes from './routes/userRoutes.mjs';
//import {connectDb} from "./config/database.mjs";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const URI = process.env.MONGO_URI;

mongoose.connect(URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const app = express();

const org="https://fetcher-xwdy.onrender.com";
const corsOptions = 
{
    origin: org, // This is the client's URL
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/',userRoutes);//tells the Express. app to use the router defined in userRoutes for any HTTP requests that match the path '/api/users'
// '/api/users': This is the base path or route prefix. The userRoutes router will handle any requests that start with this path.

const PORT = process.env.PORT;

const startServer = async () => {
    //await connectDb(); // Connect to database
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
};

console.log("Succesfull")
  
startServer();