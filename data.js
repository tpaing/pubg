const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// Connect to the MongoDB database
const url = 'mongodb+srv://tpaing11:admin1234@cluster0.ynqk9xa.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'PMNC';
const port = 9001;
const host = '192.168.100.52';
const app = express();

app.get('/PUBG-Data', (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
    const db = client.db(dbName);
    const collection = db.collection('match1');
    collection.find({}).toArray((err, data) => {
      if (err) throw err;
      client.close();
      res.json(data);
    });
  });
});


app.listen(port, host, () => {
    console.log(`Express app listening at http://${host}:${port}`);
  });
