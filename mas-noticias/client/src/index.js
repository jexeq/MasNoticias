import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import { Provider } from "react-redux";
import ConfigureStore from "./redux/store/index";
import Firebase, { FirebaseContext } from './components/firebase/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"

const store = ConfigureStore();

ReactDOM.render(
  <React.StrictMode className='font_1'>
    <Provider store = {store}>
    <FirebaseContext.Provider value={new Firebase()}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </FirebaseContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
