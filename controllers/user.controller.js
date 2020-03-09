const User = require('../models/user.model')
const Login = require('../models/login.model')
const jwt = require('jsonwebtoken')
let convertToObjectId = require('mongodb').ObjectId;

module.exports.getAllUser = async (req, res) => {
    let data = await User.find();
    res.send(data)
}

module.exports.checkLogin = async (req, res) => {
    const { username, password } = req.body;
    let data = await User.find();
    let loginData = await Login.find();

    let userLogin = data.find(v => v.username === username && v.password === password);
    if (userLogin) {
        let token = jwt.sign({ userLogin }, 'secret', {
            expiresIn: '1d'
        })
        let tokenLogin = loginData.find(v => v.userId == userLogin.id)
        if (tokenLogin) {
            Login.deleteOne({ userId: convertToObjectId(userLogin._id) }).exec();
        }

        Login.create({ token, userId: userLogin._id }).then(() => res.send(token)).catch(err => res.status(403).json({ err }));
    }
    else
        res.send(false)
}

module.exports.checkToken = async (req, res) => {

    const token = req.headers['authorization'];

    let loginData = await Login.find();

    let tokenLogin = loginData.find(v => v.token == token)
    if (tokenLogin) {
        jwt.verify(token, 'secret', (err, userData) => {
            if (userData) {
                res.send(true)
            } else if (err) {
                res.send(false)
            }
        })
    } else {
        res.send(false)
    }
}

module.exports.checkTokenMW = async (req, res, next) => {

    const token = req.headers['authorization'];

    let loginData = await Login.find();

    let tokenLogin = loginData.find(v => v.token == token)
    if (tokenLogin) {
        jwt.verify(token, 'secret', (err, userData) => {
            if (userData) {
                req.userData = userData.userLogin;
                next();66
            } else if (err) {
                res.send(false)
            }
        })
    } else {
        res.send(false)
    }
}


module.exports.register = async (req, res) => {
    console.log(req.body)
    let user = await User.find();
    let u = user.find(v => v.username == req.body.username)
    console.log(u)
    if(u){
        console.log('zo')
        res.send(false);
        
    }else{
        let us = new User({
            username :  req.body.username,
            password :  req.body.password
        })

        us.save().then(doc => res.send(doc)).catch(err => console.log(err))
    }
}