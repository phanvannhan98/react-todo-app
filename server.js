const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// Route
const memoRoute = require('./routes/memo.route')
const categoryRoute = require('./routes/category.route')


const PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


mongoose.connect('mongodb+srv://phanvannhan98:nhanvanphan004@todoapp-yjktw.mongodb.net/TodoApp?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
  console.log('Mongoose!');
});


app.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/index.html'))
})

app.use('/api/memo', memoRoute)
app.use('/api/category', categoryRoute)

app.listen(PORT);