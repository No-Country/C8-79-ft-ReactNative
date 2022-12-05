import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../screens/SplashScreen";
import UserContext from "../context/UserContext";
import {  useContext,useState,useEffect } from "react";
import Logged from "./Logged";
import NoLogged from "./NoLogged";
import { DarkTheme, LightTheme } from "../Theme/theme";
import { storeData,getData, removeData } from "../helpers/storageHelper";


 const Navigator = () => {
    const { token ,theme} = useContext(UserContext);
    const [launched, setLaunched] = useState(false)
    const LAUNCHED="LAUNCHED"

   useEffect(() => {

    //removeData()

    const req=async ()=>{
      const hasLaunched=await getData("LAUNCHED")
      console.log(hasLaunched)
      if(hasLaunched){
        setLaunched(true)
      }else{
        await storeData("LAUNCHED","LOGEADO")
        setChecked(true)
      }

    }

    req().catch(e=>console.log(e))

   
    
   }, [])
   
  
    return (
      <>
        {(token.loading) ? (
          <SplashScreen></SplashScreen>
        ) : (
          <>
            <StatusBar></StatusBar>
            <NavigationContainer theme={theme == 'Light' ? LightTheme : DarkTheme}>
              {token.token ? <Logged></Logged> : <NoLogged launched={launched}></NoLogged>}
            </NavigationContainer>
          </>
        )}
      </>
    );
  };


  export default Navigator