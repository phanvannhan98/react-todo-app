let express = require('express');
let router = express.Router();
let categoryController = require('../controllers/category.controller')

router.get('/', categoryController.getAllCategory)

module.exports = router;