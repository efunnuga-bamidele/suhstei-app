import { MYBOOKS_ACTION_TYPE } from "./myBooks.types";

export const MYBOOKS_INITIAL_STATE = {
    mybooks: []
}

export const myBooksReducer = (state = MYBOOKS_INITIAL_STATE, action ={}) => {
    const { type, payload } = action;

    switch(type) {
        case MYBOOKS_ACTION_TYPE.SET_MYBOOKS:
            return { ...state, mybooks: payload };
        default:
            return state;
    }
}