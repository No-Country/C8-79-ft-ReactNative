import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { GET_TOKEN ,SET_SPINNER,SET_THEME,SET_ERROR} from "./types";
import { useReducer } from "react";


const UserState = (props) => {
  const initialState = {
    token:{ loading: true, token: false ,uid:null},
    theme:'Light',
    spinner:false,
    error:{status:false,message:""}
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



const setError =  (status,value) => {
  console.log(status,value.message)
   
  dispatch({ type: SET_ERROR, payload:{status:status ,message:"Error de red, vuelve a intentarlo"} });

};

const throwError=(e)=>{
  setError(true,e)
  setTimeout(()=>setError(false,e),2000)
}

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
        setError,
        throwError
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;