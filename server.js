const express = require('express');
const path = require('path');
const UserController = require('./controllers/user.controller')

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static(__dirname + '/public'));
app.listen(PORT);

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://phanvannhan98:nhanvanphan004@todoapp-yjktw.mongodb.net/TodoApp?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
  console.log('Mongoose!');
});


app.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/index.html'))
})

app.get('/api', UserController.getAllUser)