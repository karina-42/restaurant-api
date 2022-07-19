const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://karina:dwkafP465ALCqkUU@cluster0.pyftha1.mongodb.net/?retryWrites=true&w=majority'

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const foodStyles = {
  'pizza': [
    {
      'name': 'ラ・ゴロセッタ',
      'area': 'Minami-Senba',
      'firstTime': false
    },
    {
      'name': 'Domino\'s',
      'area': 'delivery',
      'firstTime': false
    }
  ],
  'sushi': [
    {
      'name': 'スシロー',
      'area': ['Shinsaibashi', 'Taisho', 'others'],
      'firstTime': false
    }
  ],
  'yakiniku': [
    {
      'name': '蔓（つる）',
      'area': 'ライフの近く',
      'firstTime': false
    },
    {
      'name': '天乃',
      'area': '家の近く',
      'firstTime': false
    }
  ],
  'hamburgers': [
    {
      'name': 'McDonald\'s',
      'area': 'delivery',
      'firstTime': false
    },
    {
      'name': 'Burger King',
      'area': 'delivery',
      'firstTime': false
    },
    {
      'name': 'Mos burgers',
      'area': 'delivery',
      'firstTime': false
    },
    {
      'name': 'kua aina',
      'area': 'Umeda',
      'firstTime': false
    },
    {
      'name': 'Craft Burger',
      'area': 'Kitahorie',
      'firstTime': false
    }
  ]
}


MongoClient.connect(connectionString)
  .then(client => {
    console.log('connnnecereted!')
    const db = client.db('restaurants-api')
    const infoCollection = db.collection('restaurant-info')
  
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html')
    })

    // app.get('/api', (req, res) => {
    //   res.json(foodStyles)
    // })

    app.get('/api/:style', (req, res) => {
      const foodStyle = req.params.style.toLowerCase()
      infoCollection.find({food:foodStyle}).toArray()
      .then(results => {
        console.log(results)
        res.json(results)
        
      })
      .catch(error => console.error(error))
      
      // res.json(foodStyles)
      // if(foodStyles[foodStyle]) {
      //   res.json(foodStyles[foodStyle])
      // } else {
      //   res.json(foodStyles['default'])
      // }
    })
})
  .catch(error => console.log(error))

app.listen(process.env.PORT || PORT, () => {
  console.log(`catch server at ${PORT}!`);
})