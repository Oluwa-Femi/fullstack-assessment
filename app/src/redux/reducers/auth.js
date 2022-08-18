import { LOGGED_IN_USER, LOGOUT_USER } from "../types";

const INITIAL_STATE = {
  isAuthenticated: false,
  refreshToken: null,
  userData: {}
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGGED_IN_USER:
      return {
        ...state,
        userData: { ...action.payload },
        isAuthenticated: true
      };
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
