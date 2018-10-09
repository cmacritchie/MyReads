import React from 'react'

const ListSelector =(props) => {

    const selectedShelf = props.Shelf


    return(
        <div className="book-shelf-changer">
            <select onChange={event => props.OnSelectChange(event.target.value) }
                    // onFocus={this.selecte}
                    value={selectedShelf}
                    >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )


}

export default ListSelector;