import { MYBOOKS_ACTION_TYPE } from "./myBooks.types";
import { createAction } from '../../utils/reducer/reducer.utils';


export const setMyBooks = (myBooksArray) => createAction(MYBOOKS_ACTION_TYPE.SET_MYBOOKS, myBooksArray)