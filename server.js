const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
require('dotenv').config()


app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MD_USER}:${process.env.MD_PASSWORD}@cluster0.pg0dj0q.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

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
 
    const userDatabase = client.db("mindfulDashboard").collection("users")

    
    app.post("/users", async (req, res) => {
      const user = req.body;
      const userData = userDatabase.insertOne(user);
      res.send(userData);
    });

    
  } finally {
    
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('Start up server is running')
}) 

app.listen(port, ()=>{
    console.log(`Start Up server running on ${port}`)
})
