import React, { Fragment } from "react";
import { createDrawerNavigator, DrawerContent, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import Register from "../screens/Register";
import Home from "../screens/Home";
import CustomMenu from "./CustomMenu";
import Products from "../screens/Products";
import Clients from "../screens/Clients";
import { Image, View } from "react-native";

const Drawer = createDrawerNavigator();

const Menu = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomMenu {...props} />}
      screenOptions={{ headerStyle: { backgroundColor: "#A1D6E2" } }}
      useLegacyImplementation
      initialRouteName="Home"
    >
      
      <Drawer.Screen name="Clients" component={Clients} />
      <Drawer.Screen name="Products" component={Products} />
    </Drawer.Navigator>
  );
};

export default Menu;
