import { combineReducers } from "redux";
import { myBooksReducer } from "./myBooks/myBooks.reducer";
import { userBookReducer } from "./userBook/userBook.reducer";
import { useReducer } from './user/user.reducer';
import { bookRequestReducer } from "./booksRequest/booksRequest.reducer";

export const rootReducer = combineReducers({
    user: useReducer,
    mybooks: myBooksReducer,
    userbook: userBookReducer,
    bookrequest: bookRequestReducer
})