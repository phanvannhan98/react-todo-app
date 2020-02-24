const User = require('../models/user.model')

module.exports.getAllUser = async (req, res) => {
    
    // var user = new User({username: "abc", password: "cde"})
    // user.save().then((a) => console.log(a)).catch((b)=>console.log(b))

    
    var data = await User.find();
    res.send(data)
}

