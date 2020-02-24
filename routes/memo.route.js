let express = require('express');
let router = express.Router();
let memoController = require('../controllers/memo.controller')

router.get('/', memoController.getAllMemo)
router.get('/:id', memoController.getOneMemo)

module.exports = router;