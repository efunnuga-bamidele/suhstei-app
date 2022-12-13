import { combineReducers } from "redux";

import { useReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
    user: useReducer,
})