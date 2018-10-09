import React from 'react'
import { Link } from 'react-router-dom'


class SearchBooks extends React.Component{
constructor(props) {
    super(props);

    this.state={
            term:''
            }
}


    render() {
    return(
        <div className="search-books">
            <div className="search-books-bar">
                <Link 
                to='/'
                className="close-search" 
                >Close</Link>
                <div className="search-books-input-wrapper">
                   
                    <input  type="text" 
                            placeholder="Search by title or author"
                            onChange = {event =>this.onInputChange(event.target.value)}
                    
                    />

                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid"></ol>
            </div>
        </div>
    )
}

onInputChange(term) {

this.setState({term});
this.props.onSearchTermChange(term);

}

}

export default SearchBooks;