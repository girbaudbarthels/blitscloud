import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";


import authReducer from "./reducers/auth"
// Add firebase to reducers
export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    auth: authReducer
})

// Create store with reducers and initial state

