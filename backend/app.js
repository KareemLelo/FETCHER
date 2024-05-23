import express from "express";
import mongoose from "mongoose";
import userRoutes from './userManagementComponent/userRoutes.js';
import questRoutes from './questManagementComponent/questRoutes.js';
import vaultRoutes from './vaultManagementComponent/vaultRoutes.js';
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
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/',userRoutes);//tells the Express. app to use the router defined in userRoutes for any HTTP requests that match the path '/api/users'
// '/api/users': This is the base path or route prefix. The userRoutes router will handle any requests that start with this path.
app.use('/',questRoutes);
app.use('/',vaultRoutes);

const PORT = process.env.PORT || 5050;

const startServer = async () => {
  app.listen(() => {
    console.log(`Server running on ${PORT}`);
  });
};

startServer();