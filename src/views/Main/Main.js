import React, { useState } from "react";
import Home from "../Home/Home";
import Login from "../Login/Login";
import { getAuth } from "firebase/auth";



const Main = () => {
  const [loaded, setLoaded] = useState(false);
  const auth = getAuth()

  async function isAuthLoaded() {
    await auth._initializationPromise;
    setLoaded(auth._isInitialized)
  }

  if (!auth._isInitialized) {
    isAuthLoaded();
  }


  return (
    <div>
      {!loaded ? <div>Loading...</div> : auth.currentUser != null && auth.currentUser.emailVerified ? <Home /> : <Login />}
    </div>
  );
};



export default Main;