import React, { Component } from 'react';
import Books from './Books'

class Bookshelf extends Component {
  
      render() {
        const {shelf} = this.props
        return (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {this.props.books.map(book =>
                <li key={book.title}>
                    <Books aBook={book}  valueChanged={this.props.bookshelfChanged} />
                </li>
              )
              }
              </ol>
            </div>
          </div>
        )
      }
}
export default Bookshelf
