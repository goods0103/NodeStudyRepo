const express = require('express');
const app = express()
const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://jyjy301:lego4554**@learnmongo.uxkdd.mongodb.net/?retryWrites=true&w=majority&appName=LearnMongo'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('forum')
  app.listen(8000, () => {});

}).catch((err)=>{
  console.log(err)
})


app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({extended:true})) 


app.get('/', (request, response) => {
    response.send('ㅎㅇ')
})

app.get('/write', (request, response) => {
  response.render('write.ejs')
})

app.post('/add', (req, res) => {
  db.collection('post').insertOne({title: req.body.title, content: req.body.content})
  res.render('write.ejs')
})

app.get('/list', async (req, res) => {
    let result = await db.collection('post').find().toArray();
    res.render('list.ejs', {data : result});
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/introduce.html')
})
