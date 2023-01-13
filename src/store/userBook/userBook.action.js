import { USERBOOK_ACTION_TYPE } from "./userBook.type";
import { createAction } from '../../utils/reducer/reducer.utils';


export const setUserBookMap = (userBookMap) => createAction(USERBOOK_ACTION_TYPE.SET_USERBOOK_MAP, userBookMap)
