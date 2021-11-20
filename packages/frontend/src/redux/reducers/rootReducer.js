import { combineReducers } from "redux";
import auth from "./authReducer";
import setAppError from "./appErrorReducer";
export default combineReducers({
  auth,
  setAppError,
});
