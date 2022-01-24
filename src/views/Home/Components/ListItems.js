import { getAuth } from "firebase/auth";
import formatBytes from "format-bytes";
import axios from "axios";
import download from 'js-file-download';
import { Buffer } from 'buffer';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UPLOAD_SUCCES } from "../../../application/store/action-types/upload-types";
import { dateFormatter } from "../../../application/utils/dateformatter";
import { Container, Button, Row, Col } from "react-bootstrap"
import './ListItems.scss'

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
    download(Buffer.from(response.data.data.data, "utf-8"), fileName.replace(`${uniqueId}/`, ''))
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

    const deleteFile = async (fileName) => {
        const auth = getAuth()
        const formData = new FormData();
        formData.append("file", fileName);
    
        const response = await axios({
            method: "post",
            url: "/delete-file",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });
        let updatedFiles = [];
        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            console.log(element.metadata.name)
            if (element.metadata.name !== fileName) {
                updatedFiles = [...updatedFiles, element]
            }
            
        }
        alert(response.data.message)
        setFiles(updatedFiles)
        
    }

    return (
        <div>
            <Container fluid>
                {files.map((d, i) =>
                    <Row key={i} className={i % 2 != 0 ? "align-items-center item-row" : "align-items-center item-row-uneven"}>
                        <Col xs="4" style={{ overflow: "hidden" }}><b>{d.name.replace(`${uid}/`, '')}</b></Col>
                        <Col xs="2">{dateFormatter(d.metadata.timeCreated)}</Col>
                        <Col xs="2"><b>{formatBytes(Number(d.metadata.size))}</b></Col>
                        <Col>
                            <Button variant="outline-secondary" onClick={() => { downloadFile(d.name) }}>Download</Button>
                        </Col>
                        <Col>
                        <p onClick={()=>{deleteFile(d.name)}}>Delete</p>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    )
}

export default RenderFiles;