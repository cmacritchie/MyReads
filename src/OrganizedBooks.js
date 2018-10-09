import React from 'react'
import Book from './Book'

const OraganizedBooks = (props) =>{

    const books = props.BookList;
    const heading = props.Heading;

    


    if(!books || books.length === 0 || books.length == null)
    {
        return <div></div>;
    }
    else{

        const bookList = books.map((book) =>{
        return (   
        <Book OnShelfChange={()=> props.OnShelfChange()} key={book.id} book={book} />
        )
    })

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{heading}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {bookList}
                    </ol>
                </div>
            </div>
        )
    }
}

export default OraganizedBooks;