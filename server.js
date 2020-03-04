const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const mongoose = require('mongoose');

// Route
const memoRoute = require('./routes/memo.route')
const categoryRoute = require('./routes/category.route')
const loginRoute = require('./routes/login.route')

// CheckToken
const checkToken = require('./controllers/user.controller')

const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'clients/build')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://phanvannhan98:nhanvanphan004@todoapp-yjktw.mongodb.net/TodoApp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Mongoose!');
});

app.use('/api/memo', checkToken.checkTokenMW, memoRoute)
app.use('/api/category', checkToken.checkTokenMW, categoryRoute)
app.use('/api/login', loginRoute)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/clients/build/index.html'));
});

app.listen(PORT);