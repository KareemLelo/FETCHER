import { MongoClient } from 'mongodb';
import { dbUri } from './config.js';

export async function connectDb() {
    const client = new MongoClient(dbUri);
  try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('BZKdatabase');
    } 
    catch (error) {
        console.error('Connection to MongoDB failed:', error);
        process.exit(1);
    }
}