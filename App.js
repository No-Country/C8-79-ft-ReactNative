import "react-native-gesture-handler";
import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PasswordRecovery from "./screens/PasswordRecovery";
import Register from "./screens/Register";
import Menu from "./navigation/Menu";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
       <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}


