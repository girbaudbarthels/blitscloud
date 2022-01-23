import { UPLOAD_FAILED, UPLOAD_IN_PROGRESS, UPLOAD_SUCCES } from "../action-types/upload-types";

const INITIAL_STATE = {
  uploadMsg: ""
};

const uploadReducer = function (state = INITIAL_STATE, action) {
  if ([UPLOAD_FAILED, UPLOAD_IN_PROGRESS].includes(action.type)) {
    return { ...state, uploadMsg: action.payload, status: action.type};
  } else if (action.type === UPLOAD_SUCCES) {
    return { ...state, uploadMsg: action.payload, status: action.type, file: action.file };
  }
  return INITIAL_STATE;
}
export default uploadReducer