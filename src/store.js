import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

const middleware = [thunk];

const initialState = {};

const rootReducer = combineReducers({});

const compose = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, compose);

export default store;
