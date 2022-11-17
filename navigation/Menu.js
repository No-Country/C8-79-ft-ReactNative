import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Register from "../screens/Register";
import Home from "../screens/Home";
import CustomMenu from "./CustomMenu";

const Drawer = createDrawerNavigator();

const Menu = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomMenu {...props} />}
      screenOptions={{ headerStyle: { backgroundColor: "#A1D6E2" } }}
      useLegacyImplementation
      initialRouteName="Home"
    >
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

export default Menu;
