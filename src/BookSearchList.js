import React from 'react'
import Book from './Book'

const BookSearchList = (props) => {

    const books = props.BookList;

    if(!books || books.length === 0 || books.length == null)
    {
        return "No books under that search";
    }
    else{

        
    const bookList = books.map((book) =>{
    return (
        
    <Book key={book.id} book={book} />
    
    )
})

    return (
        <div className="search-books-results">
            <ol className="books-grid"> 
                {bookList}
            </ol>
        </div>
    )
}


}


    
export default BookSearchList;
