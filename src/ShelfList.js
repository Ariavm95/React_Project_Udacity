import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Bookshelf from './Bookshelf'

class ShelfList extends Component {
  
  render() {
    const {shelf, books, showSearch} = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
              <Bookshelf shelf={'Currently Reading'}
                books={books.filter(book => book.shelf === "currentlyReading")}
                bookshelfChanged={this.props.shelflistChanged} />
              <Bookshelf shelf={'Want to Read'}
                books={books.filter(book => book.shelf === "wantToRead")}
                bookshelfChanged={this.props.shelflistChanged} />
              <Bookshelf shelf={'Read'}
                books={books.filter(book => book.shelf === "read")}
                bookshelfChanged={this.props.shelflistChanged} />
          </div>
        </div>
        <div className="open-search">
            <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}
export default ShelfList
