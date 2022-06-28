const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(express.static('public'))
app.use(cors())

const foodStyles = {
  'pizza': [
    {
      'name': 'ラ・ゴロセッタ',
      'area': 'minami-senba',
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
      'area': ['shinsaibashi', 'taisho', 'others'],
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
  ],
  'default': {
    'name': 'home',
    'area': 'matsuyamachi',
    'firstTime': false
  }
}


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/api/:style', (req, res) => {
  const foodStyle = req.params.style.toLowerCase()
  // res.json(foodStyles)
  if(foodStyles[foodStyle]) {
    res.json(foodStyles[foodStyle])
  } else {
    res.json(foodStyles['default'])
  }
  
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`catch server at ${PORT}!`);
})