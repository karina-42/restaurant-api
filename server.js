const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://karina:dwkafP465ALCqkUU@cluster0.pyftha1.mongodb.net/?retryWrites=true&w=majority'

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

MongoClient.connect(connectionString)
  .then(client => {
    console.log('connnnected!')
    const db = client.db('restaurants-api')
    const infoCollection = db.collection('restaurant-info')
  
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html')
    })

    app.get('/api', (req, res) => {
      infoCollection.find({}).toArray()
      .then(results => {
        res.json(results)
      })
    })

    app.get('/api/:style', (req, res) => {
      const foodStyle = req.params.style.toLowerCase()
      infoCollection.find({food:foodStyle}).toArray()
      .then(results => {
        res.json(results)
      })
      .catch(error => console.error(error))
    })
})
  .catch(error => console.log(error))

app.listen(process.env.PORT || PORT, () => {
  console.log(`catch server at ${PORT}!`);
})