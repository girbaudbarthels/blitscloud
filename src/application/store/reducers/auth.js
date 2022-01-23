const INITIAL_STATE = {
  authMsg: ""
};

const authReducer = function (state = INITIAL_STATE, action) {
  return { ...state, authMsg: action.payload, status: action.type };
}
export default authReducer