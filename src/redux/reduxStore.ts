import booksReducer from "./booksReducer";
import { applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleWare from "redux-thunk"


let rootReducer = combineReducers({
   booksPage: booksReducer,

});
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
let store = createStore(
   rootReducer, applyMiddleware(thunkMiddleWare),
);
//@ts-ignore
global.store = store;

export default store;