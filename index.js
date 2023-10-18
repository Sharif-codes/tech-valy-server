const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.port || 5300

// middlewire
app.use(cors())
app.use(express.json())

console.log(process.env.DB_USER)
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://tech-valy-server:exhCBPPWIUxDC1cp@cluster0.nh9hntn.mongodb.net/?retryWrites=true&w=majority`;
console.log(process.env.DB_USER)
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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
   
    const productCollection = client.db('productDB').collection('products')

    app.get('/products', async(req,res)=>{
      const cursor= productCollection.find()
      const result= await cursor.toArray()
      res.send(result)
  })
  

  app.get('/products/:brand', async (req, res) => {
    const brand = req.params.brand;
    const query = { brand: brand };
    const result = await productCollection.find(query).toArray();
    res.send(result)
});

    app.post('/products', async (req, res) => {
      const newProduct = req.body
      const result = await productCollection.insertOne(newProduct)
      res.send(result)
    })
    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('tech vally server running')
})
app.listen(port, () => {
  console.log(`Tech valy server is running at port ${port}`)
})