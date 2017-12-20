import React, { Component } from 'react'

class Books extends Component {
  
  render() {
    const {aBook, valueChanged} = this.props
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${aBook.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select  onChange={event => valueChanged(event.target.value, aBook)} value={aBook.shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{aBook.title}</div>
        <div className="book-authors">{aBook.authors}</div>
      </div>
    )
  }
}
export default Books
