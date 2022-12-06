import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { GET_TOKEN ,SET_SPINNER,SET_THEME,SET_ERROR} from "./types";
import { useReducer } from "react";


const UserState = (props) => {
  const initialState = {
    token:{ loading: true, token: false ,uid:null},
    theme:'Light',
    spinner:false,
    error:{ user: false, network: false }
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

const setSpinner =  (value) => {
   
  dispatch({ type: SET_SPINNER, payload:value });

};

const setError =  (value) => {
  console.log(value)
   
  dispatch({ type: SET_ERROR, payload:value });

};

  return (
    <UserContext.Provider
      value={{
        token:state.token,
        theme:state.theme,
        spinner:state.spinner,
        error:state.error,
        getToken,
        setTheme,
        setSpinner,
        setError
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;