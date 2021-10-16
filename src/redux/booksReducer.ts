import { getBooksApi } from "../api/api";

const SET_BOOKS = "SET_BOOKS";
const SET_NEW_BOOKS = "SET_NEW_BOOKS";
const SET_START_INDEX = "SET_START_INDEX";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_TOTAL_BOOKS_COUNT = "SET_TOTAL_BOOKS_COUNT";
const NULLIFY_START_INDEX = "NULLIFY_START_INDEX";
const SET_SEARCH_PARAMETER = "SET_SEARCH_PARAMETER";
const SET_CATEGORY = "SET_CATEGORY";
const SET_SORT = "SET_SORT";
const SET_CURRENT_BOOK = "SET_CURRENT_BOOK";
const NULLIFY_CURRENT_BOOK = "NULLIFY_CURRENT_BOOK";

export type ImageLinksType={
  smallThumbnail: string
  thumbnail: string
}

export type VolumeInfoType={
  title: string
  authors: Array<string>
  publisher: string
  publishedDate: string
  pageCount: number
  categories: Array<string>
  imageLinks: ImageLinksType
  language: string
}

export type BookType ={
  id: string
  volumeInfo: VolumeInfoType
 
}

export type InitialStateType={
  books: Array<BookType>
  searchParameter: string
  category: string
  sort: string
  totalBooksCount: number
  startIndex: number
  maxResults: number
  isFetching: boolean
  currentBookID: string
}

let initialState = {
  books: [] as Array<BookType>,
  searchParameter: "",
  category: "all",
  sort: "relevance",
  totalBooksCount: 0,
  startIndex: 0,
  maxResults: 30 ,
  isFetching: false,
  currentBookID: "",
};

const booksReducer = (state: InitialStateType = initialState, action: any):InitialStateType => {
  switch (action.type) {
    case SET_BOOKS:
      return { ...state, books: [...state.books, ...action.books] };

    case SET_NEW_BOOKS:
      return { ...state, books: action.books };

    case SET_START_INDEX:
      let newStartIndex = state.startIndex + state.maxResults;
      return { ...state, startIndex: newStartIndex };

    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };

    case SET_TOTAL_BOOKS_COUNT:
      return { ...state, totalBooksCount: action.count };

    case NULLIFY_START_INDEX:
      return { ...state, startIndex: 0 };

    case SET_SEARCH_PARAMETER:
      if (action.searchParameter) {
        return { ...state, searchParameter: action.searchParameter };
      } else {
        return { ...state, searchParameter: "" };
      }

    case SET_CATEGORY:
      if (action.category) {
        return { ...state, category: action.category };
      } else {
        return { ...state, category: "all" };
      }

    case SET_SORT:
      if (action.sort) {
        return { ...state, sort: action.sort };
      } else {
        return { ...state, sort: "relevance" };
      }

    case SET_CURRENT_BOOK:
      debugger;
      return { ...state, currentBookID: action.currentBookID };

    case NULLIFY_CURRENT_BOOK:
      return { ...state, currentBookID: "" };

    default:
      return state;
  }
};

type SetBooksACType={
  type: typeof SET_BOOKS 
  books: Array<BookType>
}
export const setBooksAC = (books: Array<BookType>): SetBooksACType => {
  return { type: SET_BOOKS, books };
};
type SetNewBooksACType={
  type: typeof SET_NEW_BOOKS 
  books: Array<BookType>
}
export const setNewBooksAC = (books: Array<BookType>):SetNewBooksACType => {
  return { type: SET_NEW_BOOKS, books };
};
type SetStartIndexACType={
  type: typeof SET_START_INDEX 
}
export const setStartIndexAC = ():SetStartIndexACType => {
  return { type: SET_START_INDEX };
};
type NullifyIndexACType={
  type: typeof NULLIFY_START_INDEX 
}
export const nullifyIndexAC = ():NullifyIndexACType => {
  return { type: NULLIFY_START_INDEX };
};
type ToggleIsFetchingACType={
  type: typeof TOGGLE_IS_FETCHING 
  isFetching: boolean
}
export const toggleIsFetchingAC = (isFetching:boolean): ToggleIsFetchingACType => {
  return { type: TOGGLE_IS_FETCHING, isFetching };
};
type SetTotalBooksCountACType={
  type: typeof SET_TOTAL_BOOKS_COUNT 
  count: number
}
export const setTotalBooksCountAC = (totalBooksCount: number): SetTotalBooksCountACType => {
  return { type: SET_TOTAL_BOOKS_COUNT, count: totalBooksCount };
};
type SetSearchParameterACType={
  type: typeof SET_SEARCH_PARAMETER 
  searchParameter: string
}
export const setSearchParameterAC = (searchParameter: string): SetSearchParameterACType => {
  return { type: SET_SEARCH_PARAMETER, searchParameter };
};
type SetCategoryACType={
  type: typeof SET_CATEGORY 
  category: string
}
export const setCategoryAC = (category: string): SetCategoryACType => {
  return { type: SET_CATEGORY, category };
};
type SetSortACType={
  type: typeof SET_SORT 
  sort: string
}
export const setSortAC = (sort: string):SetSortACType => {
  return { type: SET_SORT, sort };
};
type SetCurrentBookIdACType={
  type: typeof SET_CURRENT_BOOK 
  currentBookID: string
}
export const setCurrentBookIdAC = (currentBookID: string): SetCurrentBookIdACType => {
  return { type: SET_CURRENT_BOOK, currentBookID };
};
type NullifyCurrentBookIdACType={
  type: typeof NULLIFY_CURRENT_BOOK 
}
export const nullifyCurrentBookIdAC = (): NullifyCurrentBookIdACType => {
  return { type: NULLIFY_CURRENT_BOOK };
};

export const getBooksBySearchThunkCreator = (//thunk creator requestBooks
  searchParameter: string,
  category: string,
  sort: string,
  startIndex: number,
  maxResults: number
) => {
    return async (dispatch: any) => {
    //thunk
    dispatch(toggleIsFetchingAC(true));
    dispatch(setSearchParameterAC(searchParameter));
    dispatch(setCategoryAC(category));
    dispatch(setSortAC(sort));
    dispatch(nullifyIndexAC());
    let response:any = await getBooksApi(
      searchParameter,
      category,
      sort,
      0,
      maxResults
    );
    dispatch(setStartIndexAC());
    dispatch(toggleIsFetchingAC(false));
    dispatch(setNewBooksAC(response.data.items));
    dispatch(setTotalBooksCountAC(response.data.totalItems));
  };
};

export const getMoreBooksBySearchThunkCreator = ( //thunk creator requestBooks
  searchParameter: string,
  category: string,
  sort: string,
  startIndex: number,
  maxResults: number
) => {
    debugger;
  return async (dispatch:any) => { //thunk
   
    dispatch(toggleIsFetchingAC(true));
    let response:any = await getBooksApi(
      searchParameter,
      category,
      sort,
      startIndex,
      maxResults
    );
    dispatch(setStartIndexAC());
    dispatch(toggleIsFetchingAC(false));
    dispatch(setBooksAC(response.data.items));
    dispatch(setTotalBooksCountAC(response.data.totalItems));
  };
};


export default booksReducer;
