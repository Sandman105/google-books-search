import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import Container from '../components/Container';
import Row from '../components/Row';
import Column from '../components/Column.js';
import Card from '../components/Card';
import { removeBook, getSavedBooks } from '../utils/API';

//So Again, here we are making this a class, because this is a stateful component. Just like with Search.js
class Saved extends Component {

    //So we only have one state here, bookList, which is the array of saved books.
    state = {
        bookList: []
    }

    //We need to our Lifecycle method here. So what is the first thing we need to do when we go to this Saved.js page. So this is the React function, so componentDidMount. Which we are call handleGetSavedBooks. So on mount, we're going to get all saved books.

    componentDidMount() {
        this.handleGetSavedBooks()
    }

    handleGetSavedBooks = () => {
        //Now we are getting the API call here, so getSavedBooks and it does not need an argument.

        //And then the promise, .then but here, what if we want to rename what comes back from axios into bookList so we don’t need to type it out again. And how do we get the data from axios, we get it by receiving a response.data. So what if we want to skip the whole response part and just rename stuff here. We can destructure the response right here, in the argument. So we are destructuring an object, in this case (({data: bookList})) and rename data to bookList.
        getSavedBooks().then(({ data: bookList }) => {
            //And then here, all we need to do is set the state to bookList since data from API is now called bookList
            this.setState({ bookList })
            //Then we just do our normal error handling here.
        })
            .catch(err => console.log(err))
    }

    //Now this is where we are removing the book. This is the function that's going to call the API when we want to get rid of our book when they click on a button to delete from the saved list. And it's going to take in the bookId again because that's how we do the delete.

    handleRemoveBook = bookId => {
        //And remove book takes in the bookId. And once this function runs, we need to get a new batch of books because the user deleted the book. So we're using handleGetSavedBooks to refresh the state of bookList, the ones still saved in the Mongo database.
        removeBook(bookId).then(this.handleGetSavedBooks)
            .catch(err => console.log(err))
    }

    //Now we are going to write the JSX here to scale the page out. And of course, do the fragment <> </> again to scale this out.
    //1. So we are going to start with a Jumbotron and make it fluid again. SO this is going to be the same Jumbotron as is on the Search.js page, just different page title. So again, demonstrating we can reuse components. So we are fluid again, background is dark, text color is light and the different page title. And we don't need to close the Jumbotron since it's self closing.
    //2. Then we are making a Container and this is not going to be a fluid container, so it's going to be a regular container.
    //3. Inside the Container we are going to have a regular Row, no justify-content-center.
    //4. And now inside the Row we are going to make a map of our saved books, so this is the same way we did it in the other one. So if there are no saved books(!this.state.bookList.length) and we add an <h2> with a className of 'text-center' and inside the tag, we say 'No saved books yet'
    //5. So now, we are going to map through the bookList, so if there is saved books (this.state.bookList.map). So we can destructuring again, so we don't have to keep writing 'book' over and over. So we need the _id, so it's coming from Mongo, so we need to use the underscore id, but in this case, we are going to rename it. But we are just going to use the easier way for now. so just book and return.
    //6. So we return a <Column and make the key the Mongo book id which is _id and make teh column side medium(md) and make it 4.
    //7. Then we are going to make a <Card inside the Column and we are going to make the card background(bg) dark and the title, book.title and image is going to be the same thing we did before on Search.js. So if book.image exists (?), give me the book.image, else (:) else undefined. So our props for <Card are defined, now we move to the children defined inside of it, so <small> tag.
    //8. Next we need, inside of our card a <small> tag and we set the className as 'text-muted' Then inside of the of <small> tag we do a Template Literal, so pretty much the same thing we did on Search.js, so going to just copy line 164 from Search.js.
    //9. So now we just add a <p> tag for a description of our book, so book.description.
    //10. Then we add a <button> for our onClick. So this is exactly what we did before EXCEPT we are passing in the Mongo book Id., and doing a this.handleRemoveBook.

    render() {
        return ( 
            <>
            <Jumbotron
            fluid
            bg={'dark'}
            color={'light'}
            pageTitle={'Viewing Saved Books'}
            />
            <Container>

            <Row>
            {!this.state.bookList.length ? (
                <h2 className='text-center'>No saved books yet....</h2>
            ) : (
                this.state.bookList.map(book => {
                    return (
                        <Column key={book._id} md={4}>
                        
                        <Card
                        bg={'dark'}
                        title={book.title}
                        image={book.image ? book.image : undefined}
                        >
                        <small className='text-muted'>
                        {`By: ${book.authors.lenght ? book.author.join(', ') : null }`}
                        </small>
                        <p>{book.description}</p>
                        <button onClick={() => this.handleRemoveBook(book._id)} className='btn btn-danger btn-sm'>
                            Remove Book
                        </button>

                        </Card>

                        </Column>   

                    )
                })
            )}
            </Row>


            </Container>
            

            </>
        );
    }


}

export default Saved;