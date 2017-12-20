import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import ShelfList from './ShelfList'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
  // allBooks contains all books in user's shelves
  // searchBooks contains result from the search
  state = {
    searchBooks: [],
    allBooks: []
  }
// make the allBooks filled with allBooks in the shelves.
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState( { allBooks: books});
    });
  }
  //what happens when the user changes the shelf
  shelflistChanged = (e , book) => {
    BooksAPI.update(book, e).then(response => {this.updateState();
   });
  }

  updateState(history_param){
     BooksAPI.getAll().then(booksData => { this.setState({
         allBooks: booksData
       })
     }).then(() => {
         if (history_param !== undefined){
           if(window.location.pathname !== '/'){
             this.setState({ searchBooks: [] })
              history_param.push('/')
           }
         }
      });
   }
 //when user type something to search a book by title or author
 search = (e) => {
   const searchQuery=e.target.value
   if(searchQuery !== ''){
     BooksAPI.search(searchQuery).then(results => {
       if(results.error === 'empty query'){
         this.setState({ searchBooks: [] })
       }
       else {
         var booksAll = this.state.allBooks
         const correctedBooks = results.reduce(function(memo, res) {
           var size = memo.length
           booksAll.map((book) => {
             if(res.id === book.id){
               memo.push(book)
             }
           })
           if(memo.length === size){
             memo.push(res)
           }
           return memo
         }, [])
         this.setState({ searchBooks: correctedBooks })
       }
     })
   }
   else {
        this.setState({ searchBooks: [] })
   }
 }

  render() {
    return (
      <div className="app">
          <Route exact path="/" render={() =>(
            <ShelfList books={this.state.allBooks}
            shelflistChanged={this.shelflistChanged}
            showSearch={this.showSearch}
            />
          )}/>
          <Route path="/search" render={({history}) => (
            <Search searchBooks={this.state.searchBooks} bookshelfChanged={(e,book) =>
                {BooksAPI.update(book, e).then(response => {this.updateState(history);})}}
               onType={this.search} clearSearchbook={() => {this.setState({ searchBooks: [] })}}
            />
          )}/>
      </div>
    );
  }
}
export default BooksApp
