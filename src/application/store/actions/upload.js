import axios from "axios";
import { UPLOAD_IN_PROGRESS, UPLOAD_SUCCES } from "../action-types/upload-types";


export const uploadFile = (file, uniqueId) => async dispatch => {
    dispatch({
        type: UPLOAD_IN_PROGRESS,
        payload: "Your file is being uploaded, please wait."
    })

    const formData = new FormData();
    formData.append("uid", uniqueId);
    formData.append("file", file);

    const response = await axios({
        method: "post",
        url: "/upload-file",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    });
    alert(response.data.message)

    dispatch({
        type: UPLOAD_SUCCES,
        payload: "Your file was succesfully uploaded.",
        file: response.data
    })

}
