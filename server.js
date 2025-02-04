const express = require('express');
const app = express()
const { MongoClient } = require('mongodb')
const { ObjectId } = require('mongodb')
const methodOverride = require('method-override')
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
app.use(methodOverride('_method')) 

app.get('/', (request, response) => {
  response.send('ㅎㅇ')
})

app.get('/detail/:id', async (req, res) => {
  try {
    objId = req.params.id;
    var result = await db.collection('post').findOne({ _id: new ObjectId(objId) })
    if (result == null) {
      res.status.send('해당 id의 글이 존재하지않습니다')
    }
    else{
      res.render('detail.ejs', { data: result })
    }
  } catch (error) {

  }
})

app.get('/write', (request, response) => {
  response.render('write.ejs')
})

app.get('/edit/:id', async (request, response) => {
  try {
  var result =  await db.collection('post').findOne({ _id: new ObjectId(request.params.id)}) 
  console.log(result);
  response.render('edit.ejs', { data : result})
  } catch (error) {
    
  }
})

app.post('/edit2/:id', async (req, res) => {
  var result = await db.collection('post').updateOne({ _id : new ObjectId(req.params.id) },
  {$set : { title : req.body.title, content : req.body.content }})
  res.redirect('/list')

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


