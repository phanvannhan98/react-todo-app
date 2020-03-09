let express = require('express');
let router = express.Router();
let userController = require('../controllers/user.controller')

router.post('/', userController.checkLogin)
router.post('/checktoken', userController.checkToken)
router.post('/register', userController.register)


module.exports = router;