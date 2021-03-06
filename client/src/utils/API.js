import axios from 'axios';

export const savedBook = bookData => {
    return axios.post('/api/books', bookData)

};

export const getSavedBooks = () => {
    return axios.get('api/books')

};

export const removeBook = bookId => {
    return axios.delete(`api/books/${bookId}`)

};

export const searchGoogleBooks = query => {
    return axios.get('https://www.googleapis.com/books/v1/volumes',{
        params: {
            q: query
        }
    });
};

//So here we can import all of these as one object or import them independently 
export default {
    savedBook,
    getSavedBooks,
    removeBook,
    searchGoogleBooks
}