import { getAuth } from "firebase/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { bindActionCreators } from "redux";
import { authActions, uploadActions } from "../../application/store/actions";
import { SIGN_OUT_SUCCES } from "../../application/store/action-types/auth-types";
import { useNavigate } from "react-router-dom";

import RenderFiles from "./Components/ListItems";

const Home = () => {
    const auth = getAuth()
    const [file, setFile] = useState();
    const [files, loadFiles] = useState();

    const dispatch = useDispatch();
    const { signout } = bindActionCreators(authActions, dispatch);
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
    const changeHandler = (event) => {
        setFile(event.target.files[0]);
    };

    //sign the user out
    const signUserOut = () => {
        signout(auth);
        navigate('/login')
    }

    return (
        <div>

            <button onClick={signUserOut} >Sign out</button>
            <input type="file" name="file" onChange={changeHandler} />
            <button onClick={() => { uploadFile(file, auth.currentUser.uid) }}>Submit</button>

            {files !== undefined &&
                <div>
                    <h3>Files</h3>
                    <ul>
                        
                            <RenderFiles files={files}></RenderFiles>
                      
                    </ul>
                </div>

            }
        </div>
    );
}

export default Home;