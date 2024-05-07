import express from "express";
import mongoose from "mongoose";
import userRoutes from './userManagementComponent/userRoutes.js';
import questRoutes from './questManagementComponent/questRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const URI = process.env.MONGO_URI;

mongoose.connect(URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const app = express();

const org=process.env.origin;
const corsOptions = 
{
    origin: org, // This is the client's URL
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/',userRoutes);//tells the Express. app to use the router defined in userRoutes for any HTTP requests that match the path '/api/users'
// '/api/users': This is the base path or route prefix. The userRoutes router will handle any requests that start with this path.
app.use('/',questRoutes);
const PORT = process.env.PORT || 5050;

app.get('/api/hello', (req, res) => {
  res.status(200).send('Hello, world!');
});

const startServer = async () => {
    //await connectDb(); // Connect to database
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
};
  
startServer();