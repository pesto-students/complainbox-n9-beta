import {
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  LOADING,
} from "../actions/types";

const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: false,
  user: null,
  IsEmailVerified: null,
  IsMobleVerified: null,
};

const registration = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        IsEmailVerified: action.payload.IsEmailVerified,
        IsMobleVerified: action.payload.IsMobileVerified,
      };
    case AUTH_ERROR:
      localStorage.getItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("userID", action.payload.id);
      localStorage.setItem("userEmail", action.payload.Email);
      localStorage.setItem("userFullName", action.payload.FullName);
      localStorage.setItem(
        "userIsEmailVerified",
        action.payload.IsEmailVerified
      );
      localStorage.setItem(
        "userIsMobileVerified",
        action.payload.IsMobileVerified
      );
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        IsEmailVerified: action.payload.IsEmailVerified,
        IsMobleVerified: action.payload.IsMobileVerified,
      };
    case LOADING:
      return {
        ...state,
        ...action.payload,
        loading: action.payload,
      };
    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userID");
      localStorage.removeItem("userFullName");
      localStorage.removeItem("userIsEmailVerified");
      localStorage.removeItem("userIsMobileVerified");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};
export default registration;
