const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
const mongoose = require('mongoose'); 
const app = express();
app.use(cors());
app.use(express.json()) 


const uri = 'mongodb+srv://admin_user:sarathe@cluster0.qgqox.mongodb.net/contact_users';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const MongoClient = require('mongodb').MongoClient 

app.post('/contactUs', (req, res) => {   
  db.collection('users').insertOne(req.body, (err, result) => {
  if (err) return console.log(err)
  res.end(JSON.stringify({ "result": "added contact users" }));
})
})


app.get('/getUsers', (req, res) => {
  var cursor = db.collection('users').find().toArray(function(err, result){
    if (err) { return console.log(err) }
    res.end(JSON.stringify({"result" : result}));
  })
})

const port = process.env.PORT || 5000;

// const client = new MongoClient(
//   'mongodb+srv://admin_user:sarathe@cluster0.qgqox.mongodb.net/contact_users', 
//   {useUnifiedTopology: true, useNewUrlParser: true });
// client.connect((err, database) => {
//  db = database.db("contact_users")


const leadsRouter = require('./routes/leads');
app.use('/leads', leadsRouter);


 app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
// })