import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";


import authReducer from "./reducers/auth"
import uploadReducer from "./reducers/upload";

// Combine the reducers
export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    auth: authReducer,
    upload: uploadReducer
})


