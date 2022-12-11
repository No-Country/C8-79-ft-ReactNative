import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "./Menu";
import Perfil from "../screens/Perfil";
import Home from "../screens/Home";
import { useTheme } from "@react-navigation/native";
import Venta from "../screens/Venta";

const Stack = createNativeStackNavigator();

const Logged = () => {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Venta} />
        <Stack.Screen name="Menu" component={Menu} />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: colors.primary },
          }}
          name="Perfil"
          component={Perfil}
        />
      </Stack.Navigator>
    </>
  );
};

export default Logged;
