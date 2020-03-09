let express = require('express');
let router = express.Router();
let categoryController = require('../controllers/category.controller')

router.get('/', categoryController.getAllCategory)
router.post('/', categoryController.addNewCategory)


module.exports = router;