const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jq4uq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
   
    const menuCollection = client.db("bistroDb").collection("menu");
    const reviewCollection = client.db("bistroDb").collection("reviews");
    const cartCollection = client.db("bistroDb").collection("carts");
   


    // app.post("/movies", async (req, res) => {
    //   const newMovie = req.body;
    //   const result = await movieCollection.insertOne(newMovie);
    //   res.send(result);
    // });

//  all menu api
    app.get("/menu", async (req, res) => {
      const menu = await menuCollection.find().toArray();
      res.send(menu);
    });
    
    // reviews api
    app.get("/review", async (req, res) => {
      const reviews = await reviewCollection.find().toArray();
      res.send(reviews);
    });

    // cart api data post
    app.post("/carts" , async(req, res)=>{
      const cart = req.body;
      const result = await cartCollection.insertOne(cart);
      res.send(result)
    })

    // card data get
    app.get("/carts", async(req, res)=>{
      const result = await cartCollection.find().toArray();
      res.send(result)
    })



    // app.get("/", async (req, res) => {
    //   res.send('server is running')
    // })

    // app.get("/movies/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const movie = await movieCollection.findOne({ _id: new ObjectId(id) });
    //   res.send(movie);
    // });

 
    // app.put("/movies/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const updatedMovie = req.body;

    //   const result = await movieCollection.updateOne(
    //     { _id: new ObjectId(id) },
    //     { $set: updatedMovie }
    //   );

    //   if (result.modifiedCount > 0) {
    //     res.send({ message: "Movie updated successfully" });
    //   } else {
    //     res.status(400).send({ message: "Failed to update movie" });
    //   }
    // });

    // app.delete("/movies/:id", async (req, res) => {
    //   const id = req.params.id;

    //   const result = await movieCollection.deleteOne({ _id: new ObjectId(id) });

    //   if (result.deletedCount > 0) {
    //     res.send({ message: "Movie deleted successfully" });
    //   } else {
    //     res.status(400).send({ message: "Failed to delete movie" });
    //   }
    // });


    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
