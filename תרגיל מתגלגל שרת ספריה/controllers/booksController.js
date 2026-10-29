const books = require('../arrays/books');


const getAllBooks = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const searchQuery = req.query.name || ''; 

  let filteredBooks = books;
  if (searchQuery) {
    filteredBooks = books.filter(book => 
      book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  res.json({
    totalItems: filteredBooks.length,
    totalPages: Math.ceil(filteredBooks.length / limit),
    currentPage: page,
    limit: limit,
    data: paginatedBooks
  });
};

// קבלת ספר לפי קוד
const getBookById = (req, res) => {
  const bookId = parseInt(req.params.id); 
  const book = books.find(b => b.id === bookId);

  if (book) {
    res.json(book);
  } else {
    res.status(404).send('הספר לא נמצא');
  }
};

// הוספת ספר
const addBook = (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  
  res.status(201).json({ 
    message: 'הספר נוסף בהצלחה', 
    book: newBook 
  });
};

// עדכון ספר
const updateBook = (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index !== -1) {
    const { isLent, lents, id, ...updateData } = req.body;
    
    books[index] = {
      ...books[index],
      ...updateData,
      id: bookId
    };

    res.json({ message: 'הספר עודכן בהצלחה', book: books[index] });
  } else {
    res.status(404).send('הספר לא נמצא');
  }
};

// ביצוע השאלה
const lendBook = (req, res) => {
  const bookId = parseInt(req.params.id);
  const { userCode } = req.body;

  if (!userCode) {
    return res.status(400).send('חובה לספק קוד משתמש עבור ההשאלה');
  }

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).send('הספר לא נמצא');
  }

  if (book.isLent) {
    return res.status(400).send('הספר כבר מושאל כרגע');
  }

  book.isLent = true;
  const today = new Date().toLocaleDateString('he-IL');
  
  book.lents.push({
    date: today,
    userCode: userCode
  });

  res.json({
    message: 'הספר הושאל בהצלחה',
    book: book
  });
};

// החזרת ספר
const returnBook = (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).send('הספר לא נמצא');
  }

  if (!book.isLent) {
    return res.status(400).send('הספר אינו מושאל כרגע');
  }

  book.isLent = false;
  res.json({ message: 'הספר הוחזר בהצלחה', book });
};

// מחיקת ספר
const deleteBook = (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index !== -1) {
    const deletedBook = books.splice(index, 1);
    res.json({ message: 'הספר נמחק בהצלחה', book: deletedBook[0] });
  } else {
    res.status(404).send('הספר לא נמצא');
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  lendBook,
  returnBook,
  deleteBook
};