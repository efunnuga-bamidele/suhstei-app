import { USER_DATA_ACTION_TYPES } from "./userProfileData.type";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setProfileData = (userProfile) => 
    createAction(USER_DATA_ACTION_TYPES.SET_USER_PROFILE, userProfile);