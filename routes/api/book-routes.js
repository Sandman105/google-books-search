//Good point made, which we've seen before, most of the backend is BOILER PLATE.
const router = require('express').Router();

//Here is where we get all the functions from our controller because we obviously need to use them in the routes. We are just destructuring them inline 
const {
    getSavedBooks,
    saveBook,
    removeBook
} = require('../../controllers/book-controller');

// GET and POST at api/books

// NEED SOME CLARIFICATION ON THIS AGAIN.
router
    .route('/')
    .get(getSavedBooks)
    .post(saveBook);

//DELETE at /api/books/:id

router
    .route('/:id')
    .delete(removeBook);

module.exports = router;