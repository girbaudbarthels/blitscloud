import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { authActions } from "../../application/store/actions";
import { SIGNUP_SUCCESS } from "../../application/store/actions/actionTypes";
const Register = () => {
    const auth = getAuth();
    const dispatch = useDispatch();
    const { signup } = bindActionCreators(authActions, dispatch);
    const state = useSelector(state => state.auth)
    const navigate = useNavigate();

    //Handler to submit the form and create an account
    const handleSubmit = (event) => {
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        signup(auth, email, password)
    }

    useEffect(() => {
        if (state.status === SIGNUP_SUCCESS) {
            navigate('/login')
        }
    })
    
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="text" name="email" />
                </label>

                <label>
                    Password:
                    <input type="text" name="password"  />
                </label>
                <input type="submit" value="Submit" />
            </form>

        </div>
    );
}

export default Register;