import React from "react";
import { BookType } from "../../redux/booksReducer";
import styles from "./Books.module.css";

type PropType={
  books: Array<BookType>
  currentBookID: string
  nullifyCurrentBookID: ()=>void
}
  const BooksProfile: React.FC<PropType> = ({ currentBookID, books, nullifyCurrentBookID }) => {
    debugger;
    let currentBook: BookType | undefined  = books.find((item) => item.id === currentBookID);
    if (currentBook){
    return (
      <div className={styles.profile}>
        <div className={styles.profileInfo}>
          <span>
            TITLE: {currentBook.volumeInfo.title ? currentBook.volumeInfo.title : "No Title"}
          </span>
          <p>
            AUTHORS:
            {currentBook.volumeInfo.authors
            ? currentBook.volumeInfo.authors
            : "No info about authors"}
          </p>
          <p>
            CATEGORIES:{" "}
            {currentBook.volumeInfo.categories
            ? currentBook.volumeInfo.categories
            : "No categories"}
          </p>
          <p>PAGES: {currentBook.volumeInfo.pageCount}</p>
          <p>LANGUAGE: {currentBook.volumeInfo.language}</p>
          <p>PUBLISHER: {currentBook.volumeInfo.publisher}</p>
          <p>PUBLISH DATE: {currentBook.volumeInfo.publishedDate}</p>
        </div>

        <div className={styles.imageProfile}>
          {(currentBook.volumeInfo.imageLinks&&currentBook.volumeInfo.imageLinks.thumbnail) ? (
            <img src={currentBook.volumeInfo.imageLinks.thumbnail}
            alt="BooksImage"
            />
            ) : (
            "no image"
          )}
        </div>
        
        <div className={styles.buttonProfile}>
           <button onClick={nullifyCurrentBookID}>BACK</button>
        </div>
               
      </div>
    );}
    else return <div>
      No Information 
      <button onClick={nullifyCurrentBookID}>BACK</button>
    </div>
  };

  

export default BooksProfile;
