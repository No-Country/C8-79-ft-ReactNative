import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { GET_TOKEN ,SET_THEME} from "./types";
import { useReducer } from "react";


const UserState = (props) => {
  const initialState = {
    token:{ loading: true, token: false ,uid:null},
    theme:'Light'
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const getToken =  (data) => {
    try {
      dispatch({ type: GET_TOKEN, payload:data });
    } catch (error) {
      console.error(error);
    }
  };

  const setTheme =  (value) => {
   
    dispatch({ type: SET_THEME, payload:value });
  
};

  return (
    <UserContext.Provider
      value={{
        token:state.token,
        theme:state.theme,
        getToken,
        setTheme,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;