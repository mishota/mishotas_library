import React from "react";
import { connect } from "react-redux";
import {
  getBooksBySearchThunkCreator,
  getBooksThunkCreator,
  getMoreBooksBySearchThunkCreator,
  nullifyStateThunkCreator,
  setCurrentBookIDAC,
  nullifyCurrentBookIDAC,
} from "../../redux/booksReducer";
import Books from "./Books";
import Preloader from "../common/Preloader/Preloader";

class BooksContainer extends React.Component {
  componentDidMount() {
    // getBooksApi('js', this.props.startIndex).then(
    //    response => this.props.setBooks(response.data.items))
    this.props.getBooksBySearch("java", "Computers", "relevance", 0, 30);
  }

  render() {
    return (
      <div>
        {this.props.isFetching ? <Preloader /> : null}

        <Books
          books={this.props.books}
          totalBooksCount={this.props.totalBooksCount}
          searchParameter={this.props.searchParameter}
          category={this.props.category}
          sort={this.props.sort}
          startIndex={this.props.startIndex}
          maxResults={this.props.maxResults}
          currentBookID={this.props.currentBookID}
          //  getBooks={this.props.getBooks}
          getBooksBySearch={this.props.getBooksBySearch}
          getMoreBooksBySearch={this.props.getMoreBooksBySearch}
          setCurrentBookID={this.props.setCurrentBookID}
          nullifyCurrentBookID={this.props.nullifyCurrentBookID}
        />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    books: state.booksPage.books,
    totalBooksCount: state.booksPage.totalBooksCount,
    isFetching: state.booksPage.isFetching,

    searchParameter: state.booksPage.searchParameter,
    category: state.booksPage.category,
    sort: state.booksPage.sort,
    startIndex: state.booksPage.startIndex,
    maxResults: state.booksPage.maxResults,
    currentBookID: state.booksPage.currentBookID,
  };
};

export default connect(mapStateToProps, {
  //   getBooks: getBooksThunkCreator,
  // nullifyState: nullifyStateThunkCreator,
  getBooksBySearch: getBooksBySearchThunkCreator,
  getMoreBooksBySearch: getMoreBooksBySearchThunkCreator,
  setCurrentBookID: setCurrentBookIDAC,
  nullifyCurrentBookID: nullifyCurrentBookIDAC,
})(BooksContainer);