import "react-native-gesture-handler";
import * as React from "react";
import { ContextProvider} from "./context/ContextProvider";
import UserState from "./context/UserState";
import Main from "./navigation/Main";


const  App=()=> {
  return (
    <UserState>
      <ContextProvider>
       <Main></Main>
      </ContextProvider>
    </UserState>
  );
}

export default App
