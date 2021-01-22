import { createStore, applyMiddleware } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";

import logger from "redux-logger";
import monitorReducerEnhancer from "./middleware/monitorReducer";
const thunk = require("redux-thunk").default;
const rootReducer = require("./reducers.js").default;

/* #### */

const middlewareEnhancer = applyMiddleware(thunk, logger);

const composeEnhancers = composeWithDevTools({
  middlewareEnhancer,
  monitorReducerEnhancer,
});

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(middlewareEnhancer)
);

export default store;
