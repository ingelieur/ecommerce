const express = require('express')
const router = express.Router()

const Book = require('../controllers/book')
const Authentization = require('../controllers/authentization')

router.post('/', Authentization.admin, Book.create)
router.get('/', Book.showAll)
router.post('/search', Book.searchTitle)
router.get('/cat/:category', Book.showByCat)
router.get('/:id', Book.showOne)
router.put('/:id', Authentization.admin, Book.update)
router.delete('/:id', Authentization.admin, Book.destroy)

module.exports = router
