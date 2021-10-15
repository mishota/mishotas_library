import { getBooksApi } from "../api/api";

const SET_BOOKS = "SET_BOOKS";
const SET_NEW_BOOKS = "SET_NEW_BOOKS";
const SET_START_INDEX = "SET_START_INDEX";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_TOTAL_BOOKS_COUNT = "SET_TOTAL_BOOKS_COUNT";
// const NULLIFY_BOOKS = "NULLIFY_BOOKS";
const NULLIFY_START_INDEX = "NULLIFY_START_INDEX";
const SET_SEARCH_PARAMETER = "SET_SEARCH_PARAMETER";
const SET_CATEGORY = "SET_CATEGORY";
const SET_SORT = "SET_SORT";
const SET_CURRENT_BOOK = "SET_CURRENT_BOOK";
const NULLIFY_CURRENT_BOOK = "NULLIFY_CURRENT_BOOK";

let initialState = {
  books: [],
  searchParameter: "",
  category: "all",
  sort: "relevance",
  totalBooksCount: 0,
  startIndex: 0,
  maxResults: 30,
  isFetching: false,
  currentBookID: "",
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return { ...state, books: [...state.books, ...action.books] };

    case SET_NEW_BOOKS:
      return { ...state, books: action.books };

    case SET_START_INDEX:
      let newStartIndex = state.startIndex + action.step;
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

export const setBooksAC = (books) => {
  return { type: SET_BOOKS, books };
};
export const setNewBooksAC = (books) => {
  return { type: SET_NEW_BOOKS, books };
};
export const setStartIndexAC = (step) => {
  return { type: SET_START_INDEX, step };
};
export const nullifyIndexAC = () => {
  return { type: NULLIFY_START_INDEX };
};

export const toggleIsFetchingAC = (isFetching) => {
  return { type: TOGGLE_IS_FETCHING, isFetching };
};

export const setTotalBooksCountAC = (totalBooksCount) => {
  return { type: SET_TOTAL_BOOKS_COUNT, count: totalBooksCount };
};
export const setSearchParameterAC = (searchParameter) => {
  return { type: SET_SEARCH_PARAMETER, searchParameter };
};
export const setCategoryAC = (category) => {
  return { type: SET_CATEGORY, category };
};
export const setSortAC = (sort) => {
  return { type: SET_SORT, sort };
};
export const setCurrentBookIDAC = (currentBookID) => {
  return { type: SET_CURRENT_BOOK, currentBookID };
};
export const nullifyCurrentBookIDAC = () => {
  return { type: NULLIFY_CURRENT_BOOK };
};

export const getBooksThunkCreator = (
  searchParameter,
  category,
  sort,
  startIndex,
  maxResults
) => {
  //thunk creator requestBooks

  return async (dispatch) => {
    //thunk
    dispatch(toggleIsFetchingAC(true));
    dispatch(setStartIndexAC(30));
    let response = await getBooksApi(
      searchParameter,
      category,
      sort,
      startIndex,
      maxResults
    );
    dispatch(toggleIsFetchingAC(false));
    dispatch(setBooksAC(response.data.items));
    dispatch(setTotalBooksCountAC(response.data.totalItems));
  };
};

export const getBooksBySearchThunkCreator = (
  searchParameter,
  category,
  sort,
  startIndex,
  maxResults
) => {
  //thunk creator requestBooks
  debugger;
  return async (dispatch) => {
    //thunk
    dispatch(toggleIsFetchingAC(true));
    dispatch(setSearchParameterAC(searchParameter));
    dispatch(setCategoryAC(category));
    dispatch(setSortAC(sort));
    dispatch(nullifyIndexAC());
    let response = await getBooksApi(
      searchParameter,
      category,
      sort,
      0,
      maxResults
    );
    dispatch(setStartIndexAC(30));
    dispatch(toggleIsFetchingAC(false));
    dispatch(setNewBooksAC(response.data.items));
    dispatch(setTotalBooksCountAC(response.data.totalItems));
  };
};

export const getMoreBooksBySearchThunkCreator = (
  searchParameter,
  category,
  sort,
  startIndex,
  maxResults
) => {
  //thunk creator requestBooks
  debugger;
  return async (dispatch) => {
    //thunk
    dispatch(toggleIsFetchingAC(true));
    let response = await getBooksApi(
      searchParameter,
      category,
      sort,
      startIndex,
      maxResults
    );
    dispatch(setStartIndexAC(30));
    dispatch(toggleIsFetchingAC(false));
    dispatch(setBooksAC(response.data.items));
    dispatch(setTotalBooksCountAC(response.data.totalItems));
  };
};

// export const nullifyStateThunkCreator = () => {   //thunk creator requestBooks

//    return (dispatch) => { //thunk
//       dispatch(nullifyIndexAC());
//       dispatch(setBooksAC([]));
//    }
// }

export default booksReducer;
