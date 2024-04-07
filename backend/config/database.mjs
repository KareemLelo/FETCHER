
/* db.js
import mongoose from 'mongoose';

const MONGO_URI="mongodb+srv://banaalhawadya:BZKMONGO@cluster0.gb0y35r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('MongoDB connected...');
    } catch (err) {
      console.log("error",err)
    }
  };
  
export default connectDB;
*/
import { MongoClient } from 'mongodb';
//import dotenv from "dotenv"
const uri = "mongodb+srv://banaalhawadya:BZKMONGO@cluster0.gb0y35r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//const uri = process.env.MONGO_URI; // Make sure to use environment variables!

export const connectDb = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Connected to db");
  return client;
};