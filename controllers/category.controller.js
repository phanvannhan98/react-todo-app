const Category = require('../models/category.model')
let convertToObjectId = require('mongodb').ObjectId;

module.exports.getAllCategory = async (req, res) => {
    let data = await Category.find({userId : convertToObjectId(req.userData._id)});
    if(data.length)
        res.send(data)
    else    
        res.send([])
}

module.exports.addNewCategory = async (req, res) => {
    let category = new Category({name: req.body.name, userId: req.userData._id})
    category.save().then((a) => { res.send(a)}).catch((b)=>res.send(b))
}

module.exports.deleteOneCategory = async (req, res) => {
    Category.deleteOne({_id : convertToObjectId(req.body.id)}).then(doc => res.send('oke')).catch(err => res.send(err))
}

