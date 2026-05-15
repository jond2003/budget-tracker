import { MongoClient, ServerApiVersion } from 'mongodb';
import { Collections, Databases, DB_URI } from '../constants/db.constants';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    // strict: true,
    deprecationErrors: true,
  }
});

const initIndexes = async () => {
  // Categories
  const categories = db.collection(Collections.CATEGORIES);
  await categories.createIndex(
    { name: 1 },
    { unique: true }
  );
};

const connectToDatabase = async () => {
  await client.connect();
  await client.db(Databases.ADMIN).command({ ping: 1 });
  await initIndexes();
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
};

connectToDatabase().catch(err => {
  console.error("Failed to connect to MongoDB:", err);
  client.close();
  process.exit(1);
});

export const db = client.db(Databases.EXPENSES_DATA);
