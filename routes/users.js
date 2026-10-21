const express = require('express');
const router = express.Router();
let users = require('../users');


router.get('/', (req, res) => {
    const usersWithoutPasswords = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        borrowed_books: user.borrowed_books
    }));

    res.status(200).json({
        count: usersWithoutPasswords.length,
        users: usersWithoutPasswords
    });
});

// הרשמת משתמש חדש
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'המשתמש כבר קיים במערכת' });
    }

    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    // יצירת אובייקט המשתמש החדש
    const newUser = {
        id: newId,
        name: name,
        email: email,
        password: password,
        borrowed_books: [] 
    };

    // הוספת המשתמש למערך
    users.push(newUser);

    res.status(201).json({ 
        message: 'המשתמש נרשם בהצלחה', 
        user: newUser 
    });
});

// התחברות משתמש
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const existingUser = users.find(u => u.email === email);
    
    if (!existingUser) {
        return res.status(400).json({ message: 'המשתמש לא קיים במערכת' });
    }

    if (existingUser.password !== password) {
        return res.status(400).json({ message: 'הסיסמה שגויה' });
    }

    res.status(200).json({
        message: 'התחברות בוצעה בהצלחה',
        user: {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email
        }
    });
});

module.exports = router;