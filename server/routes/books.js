const express = require('express');
const router = express.Router();

const crud = require('../controllers/bookCrud');

router.post('/',crud.createBook);
router.get('/', crud.showBooks);
router.get('/cat/:category', crud.showByCat);
router.get('/:id', crud.showBook);
router.put('/:id',crud.updateBook);
router.delete('/:id', crud.deleteBook);

module.exports = router;
