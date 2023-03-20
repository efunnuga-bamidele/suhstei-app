import { USER_DATA_ACTION_TYPES } from "./userProfileData.type";

const INITIAL_STATE = {
    currentUserProfile: null
}

export const profileReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type){
        case USER_DATA_ACTION_TYPES.SET_USER_PROFILE:
            return{
                ...state,
                currentUserProfile: payload
            }
        default:
            return state;
    }
}