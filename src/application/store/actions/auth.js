import { SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNIN_SUCCESS, SIGNIN_ERROR, SIGNIN_VERIFICATION, SIGN_OUT_FAILED, SIGN_OUT_SUCCES } from "./actionTypes";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

//Setup navigator

// Signing up with Firebase
export const signup = (auth, email, password) => async dispatch => {

  try {

    createUserWithEmailAndPassword(auth, email, password).then(dataBeforeEmail => {
      auth.onAuthStateChanged(function (user) {
        sendEmailVerification(dataBeforeEmail.user)

      })
    }).then(dataAfterEmail => {
      auth.onAuthStateChanged(function (user) {
    
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: "Your account was successfully created! Now you need to verify your email."
        })

      })
    }).catch(function (error) {
      console.log(error)
      alert(error)
      dispatch({
        type: SIGNUP_ERROR,
        payload: "Something went wrong, we couldn't create your account. Please try again."
      })
    })
  } catch (err) {
    console.log('err');
    alert(err)

    dispatch({
      type: SIGNUP_ERROR,
      payload: `Something went wrong, we couldn't create your account. Please try again. ${err}`
    })
  }
};

// Signing in with Firebase
export const signin = (auth, email, password) => async dispatch => {

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (auth.currentUser.emailVerified === false) {
          console.log("succes  but not verified ");

          dispatch({
            type: SIGNIN_VERIFICATION,
            payload: "Login unsuccesful, user is not verified."
          })
        } else {
          console.log("succes");

          dispatch({
            type: SIGNIN_SUCCESS,
            payload: "Login succes"
          })
        }
      })
      .catch((error) => {
        console.log(error)
        alert(error)

        dispatch({
          type: SIGNIN_ERROR,
          payload: "Invalid login credentials"
        });
      });

};

//Sign the user out
export const signout = (auth) => async dispatch => { 
  try {
    auth.signOut()
    dispatch({
      type: SIGN_OUT_SUCCES,
      payload: "Sign out succesful"
    });

  } catch (error) {
    dispatch({
      type: SIGN_OUT_FAILED,
      payload: `Something went wrong signing out: ${error}`
    });
  }

}
