import { APP_ERROR } from "../actions/types";
const INITIAL_STATE = {
  error: null,
};

const setAppError = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APP_ERROR:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};
export default setAppError;
