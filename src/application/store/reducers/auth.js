import { SIGNIN_ERROR, SIGNIN_SUCCESS, SIGNIN_VERIFICATION, SIGNUP_ERROR, SIGNUP_SUCCESS, SIGN_OUT_SUCCES, SIGN_OUT_FAILED } from "../action-types/auth-types";

const INITIAL_STATE = {
  authMsg: ""
};

const authReducer = function (state = INITIAL_STATE, action) {
  if ([SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNIN_ERROR, SIGNIN_SUCCESS, SIGNIN_VERIFICATION, SIGN_OUT_SUCCES, SIGN_OUT_FAILED].includes(action.type)) {
    return { ...state, authMsg: action.payload, status: action.type };
  } else {
    return INITIAL_STATE
  }
}
export default authReducer