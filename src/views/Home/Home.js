import { getAuth } from "firebase/auth";
import axios from "axios";
import formatBytes from "format-bytes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { bindActionCreators } from "redux";
import { authActions } from "../../application/store/actions";
import { SIGN_OUT_SUCCES } from "../../application/store/actions/actionTypes";
import { useNavigate } from "react-router-dom";
import download from 'js-file-download';
import {Buffer} from 'buffer';

const Home = () => {
    const auth = getAuth()
    const [file, setFile] = useState();
    const [files, loadFiles] = useState();

    const dispatch = useDispatch();
    const { signout } = bindActionCreators(authActions, dispatch);

    const state = useSelector(state => state.auth)

    const navigate = useNavigate();

    //Upload a file to your google cloud storage
    const uploadFile = async () => {
        if (file !== undefined) {
            const uniqueId = auth.currentUser.uid;

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
            //Manually add the file to the files state
            getFiles()
        } else {
            console.log('undefined')

        }



    }

    //Get all the files in your google cloud storage
    const getFiles = async () => {
        console.log('Getfiles')

        const uniqueId = auth.currentUser.uid;

        const formData = new FormData();
        formData.append("uid", uniqueId);

        const response = await axios({
            method: "post",
            url: "/get-files",
            data: formData,
        });
        console.log(response.data.data[0].metadata)
        loadFiles(response.data.data)
    }

    //Update the state so all files will be shown after each upload.
    useEffect(() => {
        if (auth.currentUser === undefined) {
            console.log('dis')
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

    const changeHandler = (event) => {
        setFile(event.target.files[0]);
    };

    //render files in listItems
    const renderFiles = (d, i) => {
        const name = d.name
        const uid = auth.currentUser.uid

        //Format the filename
        var new_name = name.replace(`${uid}/`, '');
        var size = 0;
        if (Number(d.metadata.size) > 0) {
            //Format the size
            size = formatBytes(Number(d.metadata.size))
        }
        //Return the formatted list
        return <li key={i}>{new_name} | uploaded: {d.metadata.timeCreated} | size: {size} | <button onClick={()=>{downloadFile(d.name)}}>Download file</button></li>
    }

    //sign the user out
    const signUserOut = () => {
        signout(auth);
        navigate('/login')
    }

      //Download specific file
      const downloadFile = async (fileName) => {
        const uniqueId = auth.currentUser.uid;

        const formData = new FormData();
        formData.append("uid", uniqueId);
        formData.append("fileName", fileName);

        const response = await axios({
            method: "post",
            url: "/download-file",
            data: formData,
        });
          
        console.log(response.data.data.data)
        download(Buffer.from(response.data.data.data, "utf-8"), fileName)
      }
    return (
        <div>

            <button onClick={signUserOut} >Sign out</button>
            <input type="file" name="file" onChange={changeHandler} />
            <button onClick={uploadFile}>Submit</button>

            {files !== undefined &&
                <div>
                    <h3>Files</h3>
                    <ul>
                        {files.map((d, i) =>

                            renderFiles(d, i)


                        )}
                    </ul>
                </div>

            }
        </div>
    );
}

export default Home;