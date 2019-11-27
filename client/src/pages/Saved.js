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

    render() {
        return ( );
    }


}

export default Saved;