const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.MD_USER}:${process.env.MD_PASSWORD}@cluster0.pg0dj0q.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const userDatabase = client.db("mindfulDashboard").collection("users");

    // Post Method for save user all data on Database
    app.post("/users", async (req, res) => {
      const user = req.body;
      const userData = userDatabase.insertOne(user);
      res.send(userData);
    });

    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userDatabase.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const userDetails = await userDatabase.findOne(query);
      res.send(userDetails);
    });

    app.put("/update/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateData = req.body;
      const updateUser = await userDatabase.updateOne(query, {
        $set: updateData,
      });
      res.send(updateUser);
    });

    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userDatabase.deleteOne(query);
      res.send(result);
    });

    // search
    app.get("/search/:keyword", async (req, res) => {
      const { keyword } = req.params; 
      const query = {
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { email: { $regex: keyword, $options: "i" } },
          { phoneNumber: { $regex: keyword, $options: "i" } },
        ],
      };
    
      const cursor = userDatabase.find(query);
      const results = await cursor.toArray();
      res.json(results);
    });
    
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Start up server is running");
});
app.listen(port, () => {
  console.log(`Start Up server running on ${port}`);
});
