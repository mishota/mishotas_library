import React from "react";
import styles from "./Books.module.css";


  const BooksProfile = ({ currentBookID, books, nullifyCurrentBookID }) => {
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

  

export default BooksProfile;
