import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import OrganizedBooks from './OrganizedBooks'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedBooks:[],
      currentlyReading:[],
      wantToRead:[],
      Read:[]
    }

    this.getAllBooks();

  }
  

  getAllBooks(){
    const currentlyReading=[];
    const wantToRead=[];
    const Read=[];

    var allOrganizedBooks = BooksAPI.getAll();

    allOrganizedBooks.then(booksReturned => 
      {
      booksReturned.forEach(book => {

        switch(book.shelf){
          case 'currentlyReading':
            currentlyReading.push(book);
            break;
          case 'wantToRead':
            wantToRead.push(book);
            break;
          case 'read':
            Read.push(book);
            break;
          default:
            break;       
        }

        this.setState({
          currentlyReading: currentlyReading,
          wantToRead: wantToRead,
          Read:Read
        });

        
      });
    }
  )



  }
   
  bookSearch(term){

    const bookList = BooksAPI.search(term.trim())
    bookList.then(searchingBooks =>{
      
      if(searchingBooks && searchingBooks != null && !searchingBooks.hasOwnProperty('error'))
      {
        this.setState({searchedBooks:searchingBooks}); 
      }else {
        this.setState({searchedBooks:[]});
      }
    });

  }

  render() {
    return (
      <div className="app">
      <Route path ='/search' render={() =>(
        
          <div>
            <SearchBooks onSearchTermChange = {(term) => this.bookSearch(term)}
                        ShowSearch = {value => this.setState({showSearchPage:value})}
                        SwitchPage ={() =>this.togglepage()} />
            <OrganizedBooks OnShelfChange={() => this.getAllBooks()} Heading="Searched Books" BookList={this.state.searchedBooks} />
          </div>
        )} />
         


        <Route exact path='/' render={()=>(
                  
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>
                
                <OrganizedBooks OnShelfChange={() => this.getAllBooks()} Heading="Currently Reading" BookList={this.state.currentlyReading} />
                <OrganizedBooks OnShelfChange={() => this.getAllBooks()} Heading="Want to Read" BookList={this.state.wantToRead} />
                <OrganizedBooks OnShelfChange={() => this.getAllBooks()} Heading="Read" BookList={this.state.Read} />
  
              </div>
            </div>
            <div className="open-search">
              <Link
              to='/search' 
              >Add a book
              </Link>
            </div>
          </div>
        )} />
      </div> 
    )
  }
}

export default BooksApp
