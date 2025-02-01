const express = require('express');
const app = express()
const { MongoClient } = require('mongodb')
const { ObjectId } = require('mongodb')

let db
let objId
const url = 'mongodb+srv://jyjy301:lego4554**@learnmongo.uxkdd.mongodb.net/?retryWrites=true&w=majority&appName=LearnMongo'
new MongoClient(url).connect().then((client) => {
  console.log('DB연결성공')
  db = client.db('forum')
  app.listen(8000, () => { });

}).catch((err) => {
  console.log(err)
})


app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (request, response) => {
  response.send('ㅎㅇ')
})

app.get('/detail/:aa', async (req, res) => {
  objId = req.params.aa;
  var result = await db.collection('post').findOne({_id : new ObjectId(objId)})
  res.render('detail.ejs', {data : result})
})

app.get('/write', (request, response) => {
  response.render('write.ejs')
})

app.post('/add', async (req, res) => {
  if (req.body.title == '') {
    console.log('제목 미작성')
  }
  else {
    try {
      await db.collection('post').insertOne({ title: req.body.title, content: req.body.content })
      res.render('write.ejs')
    } catch (error) {
      res.send('에러남')
      console.log('err');
    }
  }
})

app.get('/list', async (req, res) => {
  let result = await db.collection('post').find().toArray();
  res.render('list.ejs', { data: result });
})

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/introduce.html')
})


