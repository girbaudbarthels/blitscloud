import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "../Home/Home";
import Login from "../Login/Login";
import { bindActionCreators } from "redux";
import { authActions } from "../../application/store/actions";
import { getAuth, onAuthStateChanged } from "firebase/auth";



const Main = () => {
  const [loaded, setLoad] = useState(false);
  const dispatch = useDispatch();
  const { signin } = bindActionCreators(authActions, dispatch);
  const auth = getAuth()

  async function isAuthLoaded() {
    await auth._initializationPromise;
    setLoad(auth._isInitialized)
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