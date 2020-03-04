const mongoose = require('mongoose');
const userModel = require('./user.model')

const category = mongoose.Schema({
    name: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: userModel.modelName }
})

module.exports = mongoose.model('category', category);