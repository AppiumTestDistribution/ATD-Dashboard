import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { NAME as DASHBOARD } from "./containers/dashboard/constant";
import { NAME as TESTDETAIL } from "./containers/testDetail/constant";
import dashboardReducer from "./containers/dashboard/reducer";
import testDetailReducer from "./containers/testDetail/reducer";

const middleware = [thunk];

const initialState = {};

const rootReducer = combineReducers({
  [DASHBOARD]: dashboardReducer,
  [TESTDETAIL]: testDetailReducer
});

const compose = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, compose);

export default store;
