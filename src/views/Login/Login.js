import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from "../../application/store/actions";
import { useNavigate } from "react-router-dom"
import { SIGNIN_SUCCESS, SIGNIN_VERIFICATION } from "../../application/store/action-types/auth-types";

const Login = () => {
    const auth = getAuth();
    const dispatch = useDispatch();
    const { signin } = bindActionCreators(authActions, dispatch);
    const state = useSelector(state => state.auth)
    const navigate = useNavigate();

    //Handler to submit the form and login to your account
    const handleSubmit = (event) => {
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        signin(auth, email, password)
    }

    //Listen to changes in the state,
    useEffect(() => {
        switch (state.status) {
            case SIGNIN_VERIFICATION:
                navigate('/verification')
                break;
            case SIGNIN_SUCCESS:
                navigate('/home')
                break;
            default:
                break;
        }

    })

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="text" name="email" />
                </label>

                <label>
                    Password:
                    <input type="text" name="password" />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <a href="/register">Register</a>
        </div>
    );
}

export default Login;