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
            .catch(err => this.setState({ error: err }));
    };

    //Now to render the elements
    //1. First thing we are going to do is return a fragment, an opening and closing tag with nothing in it. It’s the same thing as if you were saying React.fragment. And we use this to wrap our JSX in something. So using a fragment is way to avoid messing up how your page is displayed.
    //2. Next we are going to make a Jumbotron. We want it to be fluid, we want the background (bg) to be dark and our color to be light, since that's out text. And our pageTitle is Search for books. So when we look at the Jumbotron component, the props from the Jumbotron.js are being passed in here, so look at lines 31-35 and those properties are being rendered here. And the pageTitle here is being defined on line 40, the <h1> tag in our component file.
    //3. Now we are going to make a regular Container and make a Row inside of it and it's going to be a regular Row. So inside the Row is going to be the entire page.
    //4. So inside the Row, we are going to create a Column and we are going to have two props in here. So now let's open up the Column.js component as a reference. So here we make the column size, xs={12} and the margin, md={4}
    //5. So inside the Column is going to be one of the cards, this one is going to be the form. So Card and the title of the card, since that's the tag header in Card.js. So we look at Card.js line 42. And that is the only prop we are going to take in for this card.
    //6. Inside the Card, we are going to make a <form> for our input field. So we are creating an an onSubmit for our handleFormSubmit.
    //7.Then we are going to make an <input> field inside the <form>. So we need type for text, form-control is the Bootstrap class for the input field so it looks nice. Placeholder, so that's 'Search for a book'. OnChange so we can keep track of the key presses, so we are going to use our function, handleInputChange. Value is searchTerm. And the Name of the input field has to be the samething as it is in state, so searchTerm. Now the input field is complete.
    //8. One other thing we are adding to the form, the error. So if this.state.error is true or exists and if there is no length to the search term, if it's an empty string. So basically, we are saying if one is true and the other is false, then render this alert. So we are creating a <div> and a className for the Bootstrap alerts. And a margin of 2. So now if we went to our page, that's the search field card.
    //9. Wait, of course, there is one more thing for the card...the button! So <button> is in a form, so we don't have to give it a click event. So className is btn btn-block, since we want it to go to the edge of the container.

    //10. Now we are going to make another Column and make it xs={12} and md={8}
    //11. And inside the Column, we are going to do the conditional rendering, so if there are no books in the bookList, if it's an empty array, we want an <h2> tag and center the text. And we are going to say, 'Search for books to begin' else and else is the colon : AND THIS IS ACTUALLY WHERE WE WILL LOOP THROUGH THE BOOKLIST TO CREATE CARDS. 
    //12. So this.state.bookList.map and for each book in the bookList, we need to render JSX. And we put our JSX inside the return.
    //13. And the first thing we will put in our JSX is a Column because we want every book to be stacked nicely against each other. So we have to put the key={book.bookId} and md-4, a margin of 4. And so since we didn't pass in another size here, our size is going to be base 12 (refer back to Column.js line 6) And we are going to close the Column.
    //14. Now inside the Column, we are going to use the Card. Again, just incase I forgot, when we hover over the tag, it gives us the props. So inside the Card tag, we have the props, so title, image, so like we did before, if book.image exist, give me book.image, which is the link, else undefined. 
    //15. Now we are inside the Card, these are the children of the card. So we are going to use a <small> tag, since we need tiny text. And this again is all from BootStrap. And we are going to put a className of 'text-muted' And inside the <small> tag, we are going to render the authors.
    //16. So we are going to make a Template Literal. So basically, if the book.authors.length is an array, make it a string, at the comma , join(', ') is what it looks like. Else, we don't want to render anything because there is no author. So we put null.
    //17. Now we are going to make a <p> tag, obviously, still inside the Card, but outside of the <small> tag. This is going to be our description. So inside our <p> tag, we are going to put <p>{book.description}</p>
    //18. Last thing is the button, the button to save the book. So first thing is we are going to handle the way to disable the button. So this.state.savedBookIds, so the value we have saved in our state, line 14. So we are going to disable the button, if savedBookIds includes book.bookId. So if it is already in the array, in state, then we are going to disable the button. Else, the button will be undefined, so that means the button will be able to be clicked. So if you want disabled to equal disabled, then this has to be true. Then we have to give the button a className, so we'll make it a small button. Then we make the click event, so onClick and we need to pass an arrow function and pass the bookId, so we use the handleBookSaveBook and we are passing in the book.bookId. And this is all coming from the .map

    render() {
        return (
            < >
                <Jumbotron
                    fluid
                    bg={'dark'}
                    color={'light'}
                    pageTitle={'Search For Books'}

                />
                <Container>
                    <Row>
                        <Column xs={12} md={4}>
                            <Card title={'Search For a Book'}>
                                <form onSubmit={this.handleFormSubmit}>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Search for a Book'
                                        onChange={this.handleInputChange}
                                        value={this.state.searchTerm}
                                        name='searchTerm'

                                    />
                                    {this.state.error && !this.state.searchTerm.length && (
                                        <div className="alert alert-danger my-2">
                                            {this.state.error}
                                        </div>
                                    )}
                                    <button type='submit' className='btn btn-block btn-dark mt-2'>
                                        Search For Books
                                    </button>
                                </form>

                            </Card>

                        </Column>
                        <Column xs={12} md={8}>
                            {!this.state.bookList.length ? (
                                <h2 className='text-center'>
                                    Search for books to begin
                                </h2>

                            ) : (
                                    this.state.bookList.map(book => {
                                        return (
                                            <Column key={book.bookId} md={4}>
                                                <Card
                                                    title={book.title}
                                                    image={book.image ? book.image : undefined}
                                                >
                                                    <small className='text-muted'>
                                                        {`By: ${book.authors.lenght ? book.author.join(', ') : null }`}

                                                    </small>
                                                    <p>{book.description}</p>
                                                    <button
                                                        disabled={
                                                            this.state.savedBookIds.includes(book.bookId) ? true : undefined
                                                        }
                                                        className={'btn btn-success btn-sm'}
                                                        onClick={() => this.handleBookSaveBook(book.bookId)}>
                                                        Save Book

                                                    </button>

                                                </Card>
                                            </Column>
                                        )
                                    })

                                )}

                        </Column>
                    </Row>
                </Container>

            </>

        )

    }

}




export default Search;