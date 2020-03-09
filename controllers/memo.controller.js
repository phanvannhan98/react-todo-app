const Memo = require('../models/memo.model')
let convertToObjectId = require('mongodb').ObjectId;

module.exports.getAllMemo = async (req, res) => {
    Memo.find({userId : convertToObjectId(req.userData._id)}).populate('category').exec().then((doc) => {
        res.send(doc)
    })
}

module.exports.getOneMemo = async (req, res) => {
    let id = req.params.id;

    let data = await Memo.findOne({ _id: id }).exec().catch(err => []);
    res.send(data);
}

module.exports.getMemoGroupByIDCategory = async (req, res) => {
    let id = req.params.id;
    let data = await Memo.findOne({ category: id }).exec().catch(err => []);
    res.send(data);
}

module.exports.updateMemo = async (req, res) => {
    let data = req.body;
    Memo.find({ _id: convertToObjectId(data._id) })
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

module.exports.addNewMemo = async (req, res) => {
    let data = req.body;
    let user = req.userData;
    let dataTemp = {...data}
    dataTemp.userId = user._id;
    dataTemp.category = data.category._id;
    let memo = new Memo(dataTemp)
    memo.save().then((a) => {res.send({...a._doc, category: data.category})}).catch((b)=>console.log(b))
}

module.exports.deleteMemo = async (req, res) => {
    let data = req.body;
    Memo.deleteOne({ _id: convertToObjectId(data._id) }).exec().then(a => res.send('ok')).catch(e => console.log(e))
}

