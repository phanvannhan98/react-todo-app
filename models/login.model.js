const mongoose = require('mongoose');
const userModel = require('./user.model')

const loginModel = mongoose.Schema({
    token: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: userModel.modelName },
})

module.exports = mongoose.model('login', loginModel);