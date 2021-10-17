import React from "react";
import { BookType } from "../../redux/booksReducer";
import styles from "./Books.module.css";

type PropsType={
  book: BookType
  setCurrentBookID: (currentBookID: string)=>void
  className?: string
  // currentBookID: string
}
let Book: React.FC<PropsType> = ({ book, setCurrentBookID }) => {
  return (
    <div className={styles.card}>
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
            {/* <NavLink to={"/" + book.id}> */}
      {(book.volumeInfo.imageLinks&&book.volumeInfo.imageLinks.thumbnail) ? (
        <img
          onClick={() => {
            setCurrentBookID(book.id);
          }}
          src={book.volumeInfo.imageLinks.thumbnail}
          className={styles.booksImage}
          alt="BooksImage"
        />
      ) : (
        "no image"
      )}
      {/* </NavLink> */}
    </div>
  );
};

export default Book;
