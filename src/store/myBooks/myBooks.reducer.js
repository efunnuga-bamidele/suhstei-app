import { MYBOOKS_ACTION_TYPE } from "./myBooks.types";

export const MYBOOKS_INITIAL_STATE = {
    myBooksMap: []
}

export const myBooksReducer = (state = MYBOOKS_INITIAL_STATE, action ={}) => {
    const { type, payload } = action;

    switch(type) {
        case MYBOOKS_ACTION_TYPE.SET_MYBOOKS_MAP:
            return { ...state, myBooksMap: [...payload]};
        default:
            return state;
    }
}