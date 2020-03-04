const User = require('../models/user.model')
const Login = require('../models/login.model')
const jwt = require('jsonwebtoken')
let convertToObjectId = require('mongodb').ObjectId;

module.exports.getAllUser = async (req, res) => {
    var data = await User.find();
    res.send(data)
}

module.exports.checkLogin = async (req, res) => {
    const { email, password } = req.body;
    let data = await User.find();
    let loginData = await Login.find();

    let userLogin = data.find(v => v.username === email && v.password === password);
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
