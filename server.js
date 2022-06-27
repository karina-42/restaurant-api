const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

const foodStyles = {
  'pizza': [
    {
      'name': 'ラ・ゴロセッタ',
      'area': ['minami-senba']
    }
  ],
  'sushi': [
    {
      'name': 'スシロー',
      'area': ['shinsaibashi', 'taisho', 'others']
    }
  ],
  'yakiniku': [
    {
      'name': '蔓（つる）',
      'area': ['ライフの近く']
    },
    {
      'name': '天乃',
      'area': ['家の近く']
    }
  ],
  'default': {
    'name': 'home',
    'area': 'matsuyamachi'
  }
}


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/api/:style', (req, res) => {
  const foodStyle = req.params.style
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