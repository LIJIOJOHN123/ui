// src/App.js

import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesPage from "./route/Route";
import store from "./store/Store";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS is imported

function App() {
  
  return (
    <>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <HelmetProvider>
            <Router>
              <RoutesPage />
              <ToastContainer position="top-right" autoClose={5000} />
            </Router>
          </HelmetProvider>
        </GoogleOAuthProvider>
      </Provider>
    </>
  );
}

export default App;

