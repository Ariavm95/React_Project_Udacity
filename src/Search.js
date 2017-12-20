import React, { Component } from 'react'
import Books from './Books'
import { Link } from 'react-router-dom'

class Search extends Component {
  // clear searchBooks in the state variable of the parent
  componentDidMount(){
    this.props.clearSearchbook()
  }
  //check if a book has shelf property
  shelfTest = (book) => {
    if(book.shelf === undefined){
      book.shelf = 'none'
    }
    return true
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            */}
            <input type="text" placeholder="Search by title or author" onChange={this.props.onType} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
           {this.props.searchBooks.map((book) =>
              (this.shelfTest(book)) && (typeof book.imageLinks !== 'undefined') &&
                  (<Books key={book.id} aBook={book} valueChanged={this.props.bookshelfChanged} />)
           )}
           </ol>
        </div>
      </div>

    )
   }

}
export default Search
