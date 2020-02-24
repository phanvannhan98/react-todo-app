const mongoose = require('mongoose');

const memo = mongoose.Schema({
    title: String,
    name: String,
    content: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'category'},
    dateCreated: {type: Date, default: Date.now},
    dateEdited: {type: Date, default: null},
    dateDeleted: {type: Date, default: null},
    isClip: Boolean,
})

module.exports = mongoose.model('memo', memo);