import React from 'react';
import ReactDOM from 'react-dom';
import '@polymer/font-roboto/roboto.js';
import "./styles/main.scss";
import App from './components/App';
import store from './store/store';
import {Provider} from 'react-redux';


ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>, 
    document.querySelector("#root")
);