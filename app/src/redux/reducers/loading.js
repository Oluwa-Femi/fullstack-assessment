/* eslint-disable import/no-anonymous-default-export */
import {
  IS_LOADING_FALSE,
  IS_LOADING_TRUE,
  IS_LOADING_GLOBAL_TRUE,
  IS_LOADING_GLOBAL_FALSE,
} from "../types";

const INITIAL_STATE = {
  isLoading: false,
  isLoadingGlobal: true,
  responsiveNav: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
      };
    case IS_LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };
    case IS_LOADING_GLOBAL_FALSE:
      return {
        ...state,
        isLoadingGlobal: false,
      };
    case IS_LOADING_GLOBAL_TRUE:
      return {
        ...state,
        isLoadingGlobal: true,
      };
    case "TOGGLE_NAV":
      return {
        ...state,
        responsiveNav: action.payload,
      };
    default:
      return state;
  }
};
