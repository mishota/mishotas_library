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
    //  let currentBook = books.map.get(currentBookID);
    let currentBook: any  = books.find((item) => item.id === currentBookID);
    if (currentBook){
    return (
      <div className="info">
        <div>{currentBook.id}</div>
        <span>TITLE: {currentBook.volumeInfo.title}</span>
        <p>AUTHORS:{currentBook.volumeInfo.authors}</p>
        <p>CATEGORIES: {currentBook.volumeInfo.categories[0]}</p>
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
    );}
    else return <div>
      No Information 
      <button onClick={nullifyCurrentBookID}>BACK</button>
    </div>
  };

  

export default BooksProfile;