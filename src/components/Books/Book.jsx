import React from "react";
import styles from "./Books.module.css";

let Book = ({ book, setCurrentBookID }) => {
  return (
    <div className={styles.card}>
      {/* <span>{book.id}</span> */}
      <div className={styles.id}>
        <span>
          TITLE: {book.volumeInfo.title ? book.volumeInfo.title : "No Title"}
        </span>
      </div>
      <p>
        AUTHORS:
        {book.volumeInfo.authors
          ? book.volumeInfo.authors
          : "No info about authors"}
      </p>
      <p>
        CATEGORIES:{" "}
        {book.volumeInfo.categories
          ? book.volumeInfo.categories[0]
          : "No categories"}
      </p>
      <p>
        LINK: {book.volumeInfo.selfLink ? book.volumeInfo.selfLink : "No link"}
      </p>
      {/* <NavLink to={"/" + book.id}> */}
      {book.volumeInfo.imageLinks.thumbnail ? (
        <img
          onClick={() => {
            setCurrentBookID(book.id);
          }}
          src={book.volumeInfo.imageLinks.thumbnail}
          className={styles.booksImage}
        />
      ) : (
        "no image"
      )}
      {/* </NavLink> */}
    </div>
  );
};

export default Book;
