import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from "../../application/store/actions";
const Verification = () => {
    const auth = getAuth();
    console.log('enne')
    const dispatch = useDispatch();
    const { signup } = bindActionCreators(authActions, dispatch);
    const state = useSelector(state => state.auth)
    console.log(state);

    //implement resend mail
    
    return (
        <div>
            <h2>Verify your account</h2>
        </div>
    );
}

export default Verification;