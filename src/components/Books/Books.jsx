import React from "react";
import Book from "./Book";
import styles from "./Books.module.css";
import { Form, Field } from "react-final-form";
import BooksProfile from "./BooksProfile";

let Books = ({
  books,
  totalBooksCount,
  searchParameter,
  category,
  sort,
  startIndex,
  maxResults,
  currentBookID,
  //   getBooks,
  getBooksBySearch,
  getMoreBooksBySearch,
  setCurrentBookID,
  nullifyCurrentBookID,
}) => {
  const onSearchSubmit = (formData) => {
    // window.alert(formData.searchParameter + formData.category + formData.sort);
    getBooksBySearch(
      formData.searchParameterField,
      formData.categoryField,
      formData.sortField,
      startIndex,
      maxResults
    );
  };

  const ShowCurrentBook = ({ currentBookID, books, nullifyCurrentBookID }) => {
    debugger;
    //  let currentBook = books.map.get(currentBookID);
    let currentBook = books.find((item) => item.id == currentBookID);
    return (
      <div className="info">
        <div>{currentBook.id}</div>
        <span>TITLE: {currentBook.volumeInfo.title}</span>
        <p>AUTHORS:{currentBook.volumeInfo.authors}</p>
        <p>CATEGORIES: {currentBook.volumeInfo.categories[0]}</p>
        <p>LINK: {currentBook.volumeInfo.selfLink}</p>
        {currentBook.volumeInfo.imageLinks.thumbnail ? (
          <img
            src={currentBook.volumeInfo.imageLinks.thumbnail}
            className={styles.booksImage}
          />
        ) : (
          "no image"
        )}
        <button onClick={nullifyCurrentBookID}>BACK</button>
      </div>
    );
  };

  return (
    <div className={styles.books}>
      <div className={styles.container}>
        <div className={styles.header}>
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
                    <option selected value="all">
                      all
                    </option>
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
          books will be here (total count={totalBooksCount})
        </div>
        {currentBookID === "" ? (
          <div>
            <div className={styles.row}>
              {books.map((b) => (
                <Book
                  className={styles.card}
                  key={b.id}
                  book={b}
                  currentBookID={currentBookID}
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
            <div>{currentBookID}</div>
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
