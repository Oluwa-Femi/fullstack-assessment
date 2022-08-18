import logger from "redux-logger";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
  
const store = createStore(rootReducer, applyMiddleware(logger));

export default store;