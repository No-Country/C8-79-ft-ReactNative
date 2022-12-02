import "react-native-gesture-handler";
import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PasswordRecovery from "./screens/PasswordRecovery";
import Register from "./screens/Register";
import Menu from './navigation/Menu'
import Login from "./screens/Login";
import NewClient from "./screens/NewClient";
import Inventario from "./screens/Inventario";
import LandingPage from "./screens/LandingPage";
import { ContextProvider } from './context/ContextProvider'
import Perfil from "./screens/Perfil";
import Reportes from "./screens/Reportes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <ContextProvider>
      {/* <StatusBar style="auto" /> */}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Landing" component={Reportes} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Perfil" component={Perfil} />

      </Stack.Navigator>
      </ContextProvider>
    </NavigationContainer>
    
  );
}


