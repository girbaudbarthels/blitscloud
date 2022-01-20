import { SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNIN_SUCCESS, SIGNIN_ERROR } from "./actionTypes";
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

// Signing up with Firebase
export const signup = (auth, email, password) => async dispatch => {

  try {

    createUserWithEmailAndPassword(auth, email, password).then(dataBeforeEmail => {

      onAuthStateChanged(function (user) {
        user.sendEmailVerification();
      })
    }).then(dataAfterEmail => {
      onAuthStateChanged(function (user) {
        if (user.emailVerified) {
          //Email is verified
          dispatch({
            type: SIGNUP_SUCCESS,
            payload: "Your account was successfully created! Now you need to verify your email."
          })
        } else {
          dispatch({
            type: SIGNUP_ERROR,
            payload: "Something went wrong, we couldn't create your account. Please try again."
          })
        }
      })
    }).catch(function (error) {
      console.log(error)

      dispatch({
        type: SIGNUP_ERROR,
        payload: "Something went wrong, we couldn't create your account. Please try again."
      })
    })
  } catch (err) {
    console.log('err');
    dispatch({
      type: SIGNUP_ERROR,
      payload: `Something went wrong, we couldn't create your account. Please try again. ${err}`
    })
  }
};

// Signing in with Firebase
export const signin = (auth, email, password, callback) => async dispatch => {
  try {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("succes");
        dispatch({
          type: SIGNIN_SUCCESS,
          payload: "Login succes"
        })
        //callback();
      })
      .catch((error) => {
        console.log(error)

        dispatch({
          type: SIGNIN_ERROR,
          payload: "Invalid login credentials"
        });
      });
  } catch (err) {
    console.log(err)
    dispatch({ type: "SIGNIN_ERROR", payload: "Invalid login credentials" });
  }
};