// src/App.js

import { HelmetProvider } from "react-helmet-async";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import RoutesPage from "./route/Route";
import store from "./store/Store";
import { useEffect } from "react";
import { currentUserAction } from "./store/authSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  
  return (
    <>
      <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <HelmetProvider>
          <Router>
            <RoutesPage />
          </Router>
        </HelmetProvider>
        </GoogleOAuthProvider>
      </Provider>
    </>
  );
}

export default App;
