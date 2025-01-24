const { MongoClient, ServerApiVersion } = require('mongodb');

// Replace <db_password> with the actual password
const uri = "mongodb+srv://clovisgpt:vKr0AMZ9PF7FpbvU@viredcluster.vdlcx.mongodb.net/?retryWrites=true&w=majority&appName=viredcluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
