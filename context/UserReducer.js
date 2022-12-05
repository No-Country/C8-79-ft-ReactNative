import { GET_TOKEN,SET_THEME } from "./types";

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
        
    default:
      return state;
  }
};