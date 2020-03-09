const Category = require('../models/category.model')
let convertToObjectId = require('mongodb').ObjectId;

module.exports.getAllCategory = async (req, res) => {
    let data = await Category.find({userId : convertToObjectId(req.userData._id)});
    res.send(data)
}

module.exports.addNewCategory = async (req, res) => {
    let category = new Category({name: req.body.name, userId: req.userData._id})
    category.save().then((a) => {console.log(a); res.send(a)}).catch((b)=>console.log(b))
}

