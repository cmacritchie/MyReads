import React  from 'react';
import ListSelector from './ListSelector';
import * as BooksAPI from './BooksAPI'

class Book extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          shelf:'none',
          
        }
    
      }

      //Adding this allows the state to be saved but unmounted component to be saved
      componentDidMount() {
        this.setState({ isMounted : true });
       var search = BooksAPI.get(this.props.book.id);
       search.then(response =>{
           if(response.hasOwnProperty('shelf'))
           {
               this.setState({shelf: response.shelf});
           }
       });
    }
    

    OnShelfChange(shelf) {
        console.log(shelf);
        this.setState({shelf});
        BooksAPI.update(this.props.book, shelf);
        this.props.OnShelfChange();
    }


    render() {

        const book = this.props.book;

        if(!book) {
            return<li>Start Searching Books </li>
        }else {
            let image = book.hasOwnProperty('imageLinks') ? book.imageLinks.smallThumbnail : 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1280px-No_image_3x4.svg.png)';
            let author = book.hasOwnProperty('authors') ? book.authors.join(', ') : '';
            return (

                <li>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}></div>
                                <ListSelector OnSelectChange={shelf => this.OnShelfChange(shelf) }
                                            //   Shelf ={book.hasOwnProperty('shelf') ? book.shelf : 'none'}
                                            Shelf={this.state.shelf}
                                />
                            </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{author}</div>
                    </div>
                </li>
            )
        }
    
    }
}

export default Book;