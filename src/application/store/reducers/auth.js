import {
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
} from "../actions/actionTypes"


const INITIAL_STATE = {
  authMsg: ""
};
const authReducer = function (state = INITIAL_STATE, action) {

  if (action.type === SIGNIN_SUCCESS) {
    return { ...state, authMsg: action.payload };
  } else if (
    action.type === SIGNUP_SUCCESS ||
    action.type === SIGNUP_ERROR ||
    action.type === SIGNIN_ERROR 
  ) {
    return { ...state, authMsg: action.payload };
  } else {
    return state;
  }

}
export default authReducer