import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { GET_TOKEN } from "./types";
import { useReducer } from "react";


const UserState = (props) => {
  const initialState = {
    token:{ loading: true, token: false ,uid:null},
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const getToken =  (data) => {
    try {
      dispatch({ type: GET_TOKEN, payload:data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        token:state.token,
        getToken,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;