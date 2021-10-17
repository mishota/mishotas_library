import { BookType } from './booksReducer';
import booksReducer, {setSearchParameterAC, nullifyIndexAC, setBooksAC, setNewBooksAC} from "./booksReducer"


// 1. test data
let book1: BookType = {
  id: "id1",
  volumeInfo: {
    title: "newBook",
    authors: ["John Xavier Merriman"],
    publisher: "no",
    publishedDate: "1966",
    pageCount: 120,
    categories: ["Computers"],
    imageLinks: {
      smallThumbnail: "http://books.google.com/books/content?id=g9ghAAAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      thumbnail: "http://books.google.com/books/content?id=g9ghAAAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    },
    language: "ru",
  }
}
let book2 = {...book1, id:"id2"}

let initialState = {
  books: [book1] ,
  searchParameter: "",
  category: "all",
  sort: "relevance",
  totalBooksCount: 0,
  startIndex: 20,
  maxResults: 30 ,
  isFetching: false,
  currentBookID: "",
};


test('new searchParameter should be added', () => {
   let action = setSearchParameterAC("Mishotik")

   // 2. action
   let newState = booksReducer(initialState, action);

   // expectations
   expect(newState.searchParameter).toBe("Mishotik");
});

test('index should be nullified', () => {
  let action = nullifyIndexAC()

  // 2. action
  let newState = booksReducer(initialState, action);

  // expectations
  expect(newState.startIndex).toBe(0);
});

test('books should be added when use Load more', () => {
  let action = setBooksAC([book2])

  // 2. action
  let newState = booksReducer(initialState, action);

  // expectations
  expect(newState.books.length).toBe(2);
});

test('books should be rewrite when use Search', () => {
  let action = setNewBooksAC([book2])

  // 2. action
  let newState = booksReducer(initialState, action);

  // expectations
  expect(newState.books.length).toBe(1);
});



