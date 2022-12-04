import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../screens/SplashScreen";
import UserContext from "../context/UserContext";
import {  useContext } from "react";
import Logged from "./Logged";
import NoLogged from "./NoLogged";


 const Navigator = () => {
    const { token } = useContext(UserContext);
  
    return (
      <>
        {token.loading ? (
          <SplashScreen></SplashScreen>
        ) : (
          <>
            <StatusBar></StatusBar>
            <NavigationContainer>
              {token.token ? <Logged></Logged> : <NoLogged></NoLogged>}
            </NavigationContainer>
          </>
        )}
      </>
    );
  };


  export default Navigator