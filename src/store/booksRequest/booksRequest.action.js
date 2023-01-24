import { BOOKREQUEST_ACTION_TYPE } from "./booksRequest.type";
import { createAction } from "../../utils/reducer/reducer.utils";


export const setBookRequest = (bookRequestMap) => createAction(BOOKREQUEST_ACTION_TYPE.SET_BOOKREQUEST_MAP, bookRequestMap)