import { getAuth } from "firebase/auth";
import axios from "axios";

import { useEffect, useState } from "react"
const Home = () => {
    const auth = getAuth()
    const [serverResponse, getResponse] = useState("no response");

    const instance = axios.create({
        baseURL: "/",
        
    })
    
    useEffect(() => {
        axios.get("api/hello").then((response) => {
            console.log(response.data);
            getResponse(response.data);
        });
    }, []);
    
    console.log(auth.currentUser);
    return (
        <div><h2>Hello: {auth.currentUser.email}</h2>
        
            <button>Sign out</button>
        
            <h4>{ serverResponse }</h4>

        </div>
    );
}

export default Home;