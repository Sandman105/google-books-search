import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import Container from '../components/Container';
import Row from '../components/Row';
import Column from '../components/Column.js';
import Card from '../components/Card';
import { searchGoogleBooks, savedBook, getSavedBooks } from '../utils/API';

class Search extends Component {
    //So what do we need in state?
    state = {
        searchTerm: '',
        bookList: [],
        savedBookIds: [],
        error: null
    }
    //handleInputChange is a boiler plate function.
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault()
        //So our normal if searchTerm equals an empty string, then return
        if (this.state.searchTerm === '') {
            //And if does equal empty string, then stop the function here and display the message below, which is displayed in the object property error: inside the state.
            return this.setState({ error: 'Please put in a title.' })
        }
        //This is coming from axios, so searchGoogleBooks is a function that takes in a query and returns a promise
        searchGoogleBooks(this.state.searchTerm).then(res => {
            //This is how the data comes back from Google Books and remember everything from axios is in data.
            const { items } = res.data
            //And if the function got this far, we are setting back the error to null
            this.setState({ error: null })
            //So again, Google is going to give back a lot of data, but we don't want all of it. WE just want what we made in our schema. So this is where we use .map to do that, create a new array.

            //And for each book we get back, 
            const bookListCleaned = items.map(book => {
                //we are going to return back a new object and we are going to define the object
                return {
                    //WE made this on the backend, bookId. And book.id, book.volumeInfo.title, etc is coming from Google Books, so you need to research the API, whatever one you are using, just like we've done with other APIs.
                    bookId: book.id,
                    title: book.volumeInfo.title,
                    //Remember, authors is an array that we made in the backend
                    authors: book.volumeInfo.authors,
                    description: book.volumeInfo.description,
                    //So keep in mind here, just like with other APIs, every book might not have an image. So what we want to do is if there is an object called imageLinks we want to make this imageLinks the  thumbnail. If not, we want to make it an empty string.
                    image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''
                };
            });

            //Now we want to set the state with the new array of objects we have. So we set bookList to bookListCleaned and searchTerm we set back to an empty string because that means this was successful.
            return this.setState({ bookList: bookListCleaned, searchTerm: '' });

        })
            //The good thing about using return in a .then is that we can use another .then. And here we're going to get all the new books, but we didn't make the function yet, but we will. 
            .then(this.retrieveSavedBooks)
            .catch(err => this.setState({ error: err }));
    };

    retrieveSavedBooks = () => {
        //So from our API we have a function called getSavedBooks and .then we know is going to return a promise.
        getSavedBooks().then(res => {
            //We used bookId here since we only want to get one thing out of the object.
            const savedBookIds = res.data.map(({ bookId }) => bookId)
            //So here we are saving the book, boookId in savedBookIds
            this.setState({ savedBookIds });
        })
            .catch(err => this.setState({ error: err }));
    };

    handleBookSaveBook = bookId => {
        //We are going to use .find to find the book on the id that we pass into this function. And we are going to do the same thing we did above.

        //Booklist is going to get all the books we search for and eventually we will print them out on a page and make button. And connected to that button is going to be the ID of that book. So the way we are going to figure out which one to save, is we are going to match up the bookId we get back with the one we are saving.
        const book = this.state.bookList.find(book => book.bookId === bookId)

        //So now we are going to call the backend with saveBook with that function and we are going to pass in the book we just found, which is an object. We are not getting a response back because we don't need a response back.
        savedBook(book).then(() => {
            //And now we are going to add this to the saved bookIds so we can disable the buttons
            //And remember, we CAN'T PUSH INTO AN ARRAY
            const savedBookIds = [...this.state.savedBookIds, bookId]
            this.setState({ savedBookIds });
        })
        .catch(err => this.setState({error: err}));
    };



}




export default Search;