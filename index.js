const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k8hkv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const database = client.db("rocket-express-orders");
        const clientsOrderDb = database.collection("client-order");
        // // create a document to insert
        console.log('db connected');

        app.post('/', async (req, res) => {
            const clientOrder = req.body;
            const result = await clientsOrderDb.insertOne(clientOrder);
            res.json(result)
            
        })

    } finally {
        //await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Setup done')
})



app.listen(port, () => {
    console.log('listening to port', port);
})