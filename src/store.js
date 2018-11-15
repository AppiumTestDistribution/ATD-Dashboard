import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { NAME } from "./containers/constant";
import dashboardReducer from "./containers/reducer";

const middleware = [thunk];

const initialState = {};

const rootReducer = combineReducers({
  [NAME]: dashboardReducer
});

const compose = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, compose);

export default store;
