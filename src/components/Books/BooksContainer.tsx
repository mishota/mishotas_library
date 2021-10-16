import React from "react";
import { connect } from "react-redux";
import {
  getBooksBySearchThunkCreator,
  getMoreBooksBySearchThunkCreator,
  setCurrentBookIdAC,
  nullifyCurrentBookIdAC,
  BookType,
} from "../../redux/booksReducer";
import Books from "./Books";
import Preloader from "../common/Preloader/Preloader";
import { AppStateType } from "../../redux/reduxStore";

type PropType={
    maxResults: number
    isFetching: boolean
    books: Array<BookType>
    totalBooksCount: number
    searchParameter: string
    category: string 
    sort: string
    startIndex: number
    currentBookID: string
    getBooksBySearch: (searchParameter: string, category: string, sort: string,
    startIndex: number, maxResults: number)=>void
    getMoreBooksBySearch: (searchParameter: string, category: string, sort: string,
    startIndex: number, maxResults: number)=>void
    setCurrentBookID: (currentBookID: string)=>void
    nullifyCurrentBookID: ()=>void
}

class BooksContainer extends React.Component<PropType> {
  componentDidMount() {
    // getBooksApi('js', this.props.startIndex).then(
    //    response => this.props.setBooks(response.data.items))
    this.props.getBooksBySearch(
      "java",
      "Computers",
      "relevance",
      0,
      this.props.maxResults
    );
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
          getBooksBySearch={this.props.getBooksBySearch}
          getMoreBooksBySearch={this.props.getMoreBooksBySearch}
          setCurrentBookID={this.props.setCurrentBookID}
          nullifyCurrentBookID={this.props.nullifyCurrentBookID}
        />
      </div>
    );
  }
}

let mapStateToProps = (state: AppStateType) => {
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
  getBooksBySearch: getBooksBySearchThunkCreator,
  getMoreBooksBySearch: getMoreBooksBySearchThunkCreator,
  setCurrentBookID: setCurrentBookIdAC,
  nullifyCurrentBookID: nullifyCurrentBookIdAC,
})(BooksContainer);
