import { GET_TOKEN, SET_ERROR, SET_SPINNER, SET_THEME } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_TOKEN:
      return {
        ...state,
        token: payload,
      };
    case SET_THEME:
      return {
        ...state,
        theme: payload,
      };
    case SET_SPINNER:
      return {
        ...state,
        spinner: payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};
