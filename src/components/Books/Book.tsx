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
          TITLE: {book.volumeInfo.title && book.volumeInfo.title} 
        </span>
      </div>
      <p>
        AUTHORS:
        {book.volumeInfo.authors && book.volumeInfo.authors}
      </p>
      <p>
        CATEGORIES:{" "}
        {book.volumeInfo.categories
          ? book.volumeInfo.categories[0]
          : ""}
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
        ""
      )}
      {/* </NavLink> */}
    </div>
  );
};

export default Book;
