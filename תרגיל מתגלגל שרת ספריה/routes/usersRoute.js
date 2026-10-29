const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// הגדרת הניתובים
router.get('/', usersController.getAllUsers);
router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);

module.exports = router;