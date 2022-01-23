import { getAuth } from "firebase/auth";
import formatBytes from "format-bytes";
import axios from "axios";
import download from 'js-file-download';
import { Buffer } from 'buffer';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UPLOAD_SUCCES } from "../../../application/store/action-types/upload-types";
import { dateFormatter } from "../../../application/utils/dateformatter";

//Download specific file
const downloadFile = async (fileName) => {
    const auth = getAuth()
    const uniqueId = auth.currentUser.uid;

    const formData = new FormData();
    formData.append("uid", uniqueId);
    formData.append("fileName", fileName);

    const response = await axios({
        method: "post",
        url: "/download-file",
        data: formData,
    });
    download(Buffer.from(response.data.data.data, "utf-8"), fileName)
}


//render files in listItems
const RenderFiles = (props) => {
    const [files, setFiles] = useState(props.files)

    const uploadState = useSelector(state => state.upload)

    const auth = getAuth()

    const uid = auth.currentUser.uid

    useEffect(() => {
        if ((uploadState.status === UPLOAD_SUCCES) && !files.includes(uploadState.file.data)) {
            const updatedFiles = [...files, uploadState.file.data]
            setFiles(updatedFiles)
        }
    })

    files.sort(function (a, b) {
        return new Date(b.metadata.timeCreated) - new Date(a.metadata.timeCreated)
    })    

    return (
        <div>
            {files.map((d, i) =>
                // renderFiles(d, i)
                <li key={i}>{d.name.replace(`${uid}/`, '')} | uploaded: {dateFormatter(d.metadata.timeCreated)} | size: {formatBytes(Number(d.metadata.size))} | <button onClick={() => { downloadFile(d.name) }}>Download file</button></li>
            )}
        </div>
    )
}

export default RenderFiles;