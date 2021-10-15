import booksReducer from "./booksReducer";
import { applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleWare from "redux-thunk"


let rootReducer = combineReducers({
   booksPage: booksReducer,

});

let store = createStore(
   rootReducer, applyMiddleware(thunkMiddleWare),
);
global.store = store;

export default store;