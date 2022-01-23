import firebase from "./infrastructure/services/firebase/firebase"

import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import { Provider } from "react-redux";
import { rootReducer } from './application/store/';

import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";


const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk))
// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}


function RunApp() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <App />
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

render(< RunApp />, document.getElementById('root'))