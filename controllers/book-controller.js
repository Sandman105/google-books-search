const { Book } = require('../models');

//These are going to get all of our saved books.
const getSavedBooks = (req, res) => {
    //We are finding all books here.
    Book.find({})
        .then(dbBookData => res.json(dbBookData))
        .catch(err => {
            //We are console.log the error and sending it back to the front-end
            console.log(err);
            res.json(err);
        });
}

const saveBook = (req, res) => {
    //So here we are creating a book and using req.body because we are going to give it the structure because we are going to get back what Google Books gives us, but we don't want to use all of what they give us back.
    Book.create(req.body)
        .then(dbBookData => res.json(dbBookData))
        .catch(err => {
            //We are console.log the error and sending it back to the front-end
            console.log(err);
            res.json(err);
        });
}

const removeBook = (req, res) => {
    Book.remove({
        //We are going to use ID here to get the ID of the book the user wants to remove, like we've done many times before.
        _id: req.params.id

    })
        .then(dbBookData => res.json(dbBookData))
        .catch(err => {
            //We are console.log the error and sending it back to the front-end
            console.log(err);
            res.json(err);
        });

}

//And here we are going to export the object for every function and the controller is DONE!
module.exports = {
    getSavedBooks,
    saveBook,
    removeBook
};