import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "./Menu";
import Perfil from "../screens/Perfil";
import SplashScreen from "../screens/SplashScreen";
import Home from "../screens/Home";
import Venta from "../screens/Venta";

const Stack = createNativeStackNavigator();

const Logged = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen  options={{
        headerShown: true,
      }} name="Perfil" component={Perfil} />
    </Stack.Navigator>
  );
};

export default Logged;
