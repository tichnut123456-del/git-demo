const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

//הגדרת ניתובים
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.addBook);
router.put('/:id', booksController.updateBook);
router.put('/:id/lend', booksController.lendBook);
router.put('/:id/return', booksController.returnBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;