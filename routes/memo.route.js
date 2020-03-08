let express = require('express');
let router = express.Router();
let memoController = require('../controllers/memo.controller')

router.get('/', memoController.getAllMemo)
router.get('/:id', memoController.getOneMemo)
router.get('/groupby-category/:id', memoController.getMemoGroupByIDCategory)

router.post('/', memoController.addNewMemo)
router.patch('/', memoController.updateMemo)
router.delete('/', memoController.deleteMemo)

module.exports = router;