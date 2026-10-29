
const express = require('express');
const app = express();
app.use(express.json());
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');



app.use(cors());          // פתרון בעיית ה-CORS לקליינט
app.use(morgan('dev'));   // הדפסת נתוני הבקשות בטרמינל במצב פיתוח

app.use(express.json());

// ייבוא וחיבור קובץ הניתוב של המשתמשים
const usersRouter = require('./routes/usersRoute');
app.use('/users', usersRouter);
 const booksRouter = require('./routes/booksRoute');
 app.use ('/books',booksRouter)
 const middleware = require('./middlewars/middleware1');

 app.use(middleware.blockDay(7));


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(middleware.pageNotFound);