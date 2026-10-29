
const express = require('express');
const app = express();
app.use(express.json());

// ייבוא וחיבור קובץ הניתוב של המשתמשים
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
 const booksRouter = require('./routes/books');
 app.use ('/books',booksRouter)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});