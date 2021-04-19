import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	auth: authReducer,
});

const composeEnhancers = process.env.NODE_ENV === 'development' ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// Provider Redux должен включать в себя и BrowserRouter,
// он должен быть самым первым компонентом
ReactDOM.render(<Provider store={store}><BrowserRouter
			basename="/askaranko.co/burger-builder/"
	><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
