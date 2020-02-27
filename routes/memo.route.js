let express = require('express');
let router = express.Router();
let memoController = require('../controllers/memo.controller')

router.get('/', memoController.getAllMemo)
router.get('/:id', memoController.getOneMemo)
router.get('/groupby-category/:id', memoController.getMemoGroupByIDCategory)

router.patch('/', memoController.updateMemo)


module.exports = router;