import React from "react";
import Book from "./Book";
import styles from "./Books.module.css";
import { Form, Field } from "react-final-form";
import BooksProfile from "./BooksProfile";
import { BookType } from "../../redux/booksReducer";

type BooksPropType={
  books: Array<BookType>
  totalBooksCount: number
  searchParameter: string
  category: string 
  sort: string
  startIndex: number
  maxResults: number
  currentBookID: string
  getBooksBySearch: (searchParameter: string, category: string, sort: string,
  startIndex: number, maxResults: number)=>void
  getMoreBooksBySearch: (searchParameter: string, category: string, sort: string,
    startIndex: number, maxResults: number)=>void
  setCurrentBookID: (currentBookID: string)=>void
  nullifyCurrentBookID: ()=>void
}

let Books: React.FC<BooksPropType> = ({
  books,
  totalBooksCount,
  searchParameter,
  category,
  sort,
  startIndex,
  maxResults,
  currentBookID,
  getBooksBySearch,
  getMoreBooksBySearch,
  setCurrentBookID,
  nullifyCurrentBookID,
}) => {
  const onSearchSubmit = (formData:any) => {
    // window.alert(formData.searchParameter + formData.category + formData.sort);
    getBooksBySearch(
      formData.searchParameterField,
      formData.categoryField,
      formData.sortField,
      startIndex,
      maxResults
    );
  };

  return (
    <div className={styles.books}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>FIND YOUR BOOK</h1>
          <Form
            // onSubmit={(formData) => { window.alert(formData.login) }}>
            onSubmit={onSearchSubmit}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <Field
                    name="searchParameterField"
                    component="input"
                    placeholder={"Input text for searching"}
                  />
                  <button type="submit">Search</button>
                </div>
                <div>
                  <Field
                    component="select"
                    name="categoryField"
                    className={"form-control"}
                  >
                    <option defaultValue="all">all</option>
                    <option value="art">art</option>
                    <option value="computers">computers</option>
                    <option value="history">history</option>
                    <option value="medical">medical</option>
                    <option value="poetry">poetry</option>
                  </Field>
                  <Field
                    component="select"
                    name="sortField"
                    className={"form-control"}
                  >
                    <option selected value="relevance">
                      relevance
                    </option>
                    <option value="newest">newest</option>
                  </Field>
                </div>
              </form>
            )}
          </Form>
         We found {totalBooksCount} books for you!
        </div>
        {currentBookID === "" ? (
          <div>
            <div className={styles.row}>
              {books.map((b) => (
                <Book
                  className ={styles.card}
                  key={b.id}
                  book={b}
                  // currentBookID={currentBookID}
                  setCurrentBookID={setCurrentBookID}
                />
              ))}
            </div>
            <div className={styles.loadMore}>
              <button
                onClick={() => {
                  getMoreBooksBySearch(
                    searchParameter,
                    category,
                    sort,
                    startIndex,
                    maxResults
                  );
                }}
              >
                Load More
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <BooksProfile
                currentBookID={currentBookID}
                books={books}
                nullifyCurrentBookID={nullifyCurrentBookID}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
