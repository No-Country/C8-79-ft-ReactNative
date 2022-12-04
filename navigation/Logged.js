import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "./Menu";
import Perfil from "../screens/Perfil";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();

const Logged = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Perfil" component={Perfil} />
    </Stack.Navigator>
  );
};

export default Logged;
