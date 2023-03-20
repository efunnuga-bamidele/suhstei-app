import { combineReducers } from "redux";
import { myBooksReducer } from "./myBooks/myBooks.reducer";
import { userBookReducer } from "./userBook/userBook.reducer";
import { useReducer } from './user/user.reducer';
import { bookRequestReducer } from "./booksRequest/booksRequest.reducer";
import { profileReducer } from './userProfileData/userProfileData.reducer';

export const rootReducer = combineReducers({
    user: useReducer,
    userProfile: profileReducer,
    mybooks: myBooksReducer,
    userbook: userBookReducer,
    bookrequest: bookRequestReducer
})