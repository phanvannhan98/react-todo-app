const Category = require('../models/category.model')

module.exports.getAllCategory = async (req, res) => {

    // for(var i=1; i<3;i++){
    //     var category = new Category({name: 'Category-0'+(i+1)})
    //     category.save().then((a) => console.log(a)).catch((b)=>console.log(b))
    // }

    var data = await Category.find();
    res.send(data)
}

