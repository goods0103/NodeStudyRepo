const express = require('express');
const app = express()

app.listen(8000, () => {

});

app.get('/', (request, response) => {
    response.send('ㅎㅇ')
})

app.get('/shop', (request, response) => {
    response.send('shopping')
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/introduce.html')
})
