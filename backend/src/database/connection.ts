import { MongoClient, ServerApiVersion } from 'mongodb';
import { Databases, DB_URI } from '../constants/db.constants';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    // strict: true,
    deprecationErrors: true,
  }
});

try {
  // Connect the client to the server	(optional starting in v4.7)
  client.connect();
  // Send a ping to confirm a successful connection
  client.db(Databases.ADMIN).command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} finally {
  // Ensures that the client will close when you finish/error
  client.close();
}

const db = client.db(Databases.EXPENSES_DATA);

export default db;
