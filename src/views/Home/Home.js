import { getAuth } from "firebase/auth";
import axios from "axios";

import { useState } from "react"
const Home = () => {
    const auth = getAuth()
    const [serverResponse, getResponse] = useState("no response");
    const [pickedFile, setFile] = useState();
    const instance = axios.create({
        baseURL: "/",

    })

    const uploadFile = async () => {
        if (pickedFile != undefined) {
            const uniqueId = auth.currentUser.uid;

            const formData = new FormData();
            formData.append("uid", uniqueId);
            formData.append("file", pickedFile);

            const response = await axios({
                method: "post",
                url: "/upload-file",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            getResponse(response.data.message);
        } else {
            console.log('undefined')

        }



    }

    const changeHandler = (event) => {
        setFile(event.target.files[0]);
    };
    console.log(auth.currentUser);
    return (
        <div><h2>Hello: {auth.currentUser.email}</h2>

            <button>Sign out</button>
            <input type="file" name="file" onChange={changeHandler} />
            <button onClick={uploadFile}>Submit</button>

            <h4>{serverResponse}</h4>

        </div>
    );
}

export default Home;