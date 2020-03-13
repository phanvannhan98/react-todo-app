const Category = require('../models/category.model')
const Memo = require('../models/memo.model')
let convertToObjectId = require('mongodb').ObjectId;

module.exports.getAllCategory = async (req, res) => {
    let data = await Category.find({ userId: convertToObjectId(req.userData._id) });
    if (data.length)
        res.send(data)
    else
        res.send([])
}

module.exports.addNewCategory = async (req, res) => {
    let category = new Category({ name: req.body.name, userId: req.userData._id })
    category.save().then((a) => { res.send(a) }).catch((b) => res.send(b))
}

module.exports.deleteOneCategory = async (req, res) => {
    Category.deleteOne({ _id: convertToObjectId(req.body.id) })
        .then(() => {
            Memo.deleteMany({ category: convertToObjectId(req.body.id) })
                .then((d) => { console.log(d); res.send('oke') })
                .catch(err => console.log(err))
        }).catch(err => res.send(err))
}

module.exports.updateCategory = async (req, res) => {
    let data = req.body;
    console.log(data)
    Category.find({ _id: convertToObjectId(data._id) })
        .updateOne({ $set: data })
        .exec()
        .then(result => {
            if (result) {
                res.send(result)
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}
