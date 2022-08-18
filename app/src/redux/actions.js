/* eslint-disable no-unused-vars */
import { LOGOUT_USER, LOGGED_IN_USER } from "./types";
import { IS_LOADING_TRUE, IS_LOADING_FALSE } from "./types";
import handleError from "../utils/handleError";
import { postApi } from "../utils/reqClient";

export const login = (params, history) => async (dispatch) => {
  try {
    // Set loading to true before endpoint call
    dispatch({ type: IS_LOADING_TRUE });
    const response = await postApi(`auth/signin`, params);
    if (response.data.jwt) {
      const { profile, jwt } = response.data;
      localStorage.setItem("_mt_", jwt);
      dispatch({ type: LOGGED_IN_USER, payload: profile });
      dispatch({ type: IS_LOADING_FALSE });
      return history.push("/user-dashboard");
    }
    dispatch({ type: IS_LOADING_FALSE });
  } catch (error) {
    // Set loading to false after endpoint call is not successful
    dispatch({ type: IS_LOADING_FALSE });
    handleError(error);
  }
};

export const signUp = (body, history) => async (dispatch) => {
  try {
    // Set loading to true before endpoint call
    dispatch({ type: IS_LOADING_TRUE });
    const response = await postApi(`auth/register`, body);
    if (response.data.email) {
      dispatch({ type: IS_LOADING_FALSE });
      return history.push("/");
    }
    dispatch({ type: IS_LOADING_FALSE });
  } catch (error) {
    // Set loading to false after endpoint call is not successful
    dispatch({ type: IS_LOADING_FALSE });
    handleError(error);
  }
};

