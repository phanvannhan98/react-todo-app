const Category = require('../models/category.model')
var convertToObjectId = require('mongodb').ObjectId;

module.exports.getAllCategory = async (req, res) => {

    // for(var i=1; i<3;i++){
    //     var category = new Category({name: 'Category-0'+(i+1), userId: '5e5e0e37db976f15ece2c1bd'})
    //     category.save().then((a) => console.log(a)).catch((b)=>console.log(b))
    // }
    
    var data = await Category.find({userId : convertToObjectId(req.userData._id)});
    res.send(data)
}

