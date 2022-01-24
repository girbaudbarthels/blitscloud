import { getAuth } from "firebase/auth";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { bindActionCreators } from "redux";
import { uploadActions } from "../../application/store/actions";
import { SIGN_OUT_SUCCES } from "../../application/store/action-types/auth-types";
import { useNavigate } from "react-router-dom";

import RenderFiles from "./Components/ListItems";

import { Button, Row, Col, Container,  } from "react-bootstrap"
import Sidebar from "./Components/Sidebar";
import './Home.scss'
const Home = () => {
    const auth = getAuth()
    const [files, loadFiles] = useState();

    const dispatch = useDispatch();
    const { uploadFile } = bindActionCreators(uploadActions, dispatch);

    const state = useSelector(state => state.auth)

    //Init navigation
    const navigate = useNavigate();

    //Update the state so all files will be shown after each upload.
    useEffect(() => {
        if (auth.currentUser === null) {
            navigate('/')
            return;
        }
        if (files === undefined) {
            getFiles()
        }
        if (state.status === SIGN_OUT_SUCCES) {
            navigate('/login')
        }

    })

    //Get all the files in your google cloud storage
    const getFiles = async () => {
        const uniqueId = auth.currentUser.uid;

        const formData = new FormData();
        formData.append("uid", uniqueId);

        const response = await axios({
            method: "post",
            url: "/get-files",
            data: formData,
        });
        loadFiles(response.data.data)
    }

    //Put the selected file into the file state
    const changeHandler = async (event) => {
        uploadFile(event.target.files[0], auth.currentUser.uid)
    };

    const inputFile = useRef(null)

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };

    return (
        <Container fluid >
            <Row>
                <Sidebar></Sidebar>

                <Col className="home">
                    <input type="file" name="file" onChange={changeHandler} style={{ display: 'none' }} ref={inputFile} />

                    {files !== undefined &&
                        <div>
                            <Row className="justify-content-between" fluid={false}>
                                <h3 className="buttonWidth">My files</h3>
                                <Button className="buttonWidth" variant="primary" onClick={onButtonClick}>Upload file</Button>
                            </Row>
                            <RenderFiles files={files}></RenderFiles>
                        </div>
                    }
                </Col>

            </Row>
        </Container>
    );
}

export default Home;