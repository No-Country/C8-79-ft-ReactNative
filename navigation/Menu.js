import React, { Fragment } from "react";
import { createDrawerNavigator, DrawerContent, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import Register from "../screens/Register";
import Home from "../screens/Home";
import CustomMenu from "./CustomMenu";
import Products from "../screens/Products";
import Clients from "../screens/Clients";
import { Image, View } from "react-native";
import ClientDetail from "../screens/ClientDetail";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewClient from "../screens/NewClient";
import EditClient from "../screens/EditClient";


const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();



const ClientsStack=()=>{
return <Stack.Navigator
  screenOptions={{
    headerShown: false,
  }}
>
 <Stack.Screen name="ClientsScreen" component={Clients} />
  <Stack.Screen name="ClientDetail" component={ClientDetail} />
  <Stack.Screen name="NewClient" component={NewClient} />
  <Stack.Screen name="EditClient" component={EditClient} />
</Stack.Navigator>}

const Menu = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomMenu {...props} />}
      screenOptions={{ 
      headerStyle: { backgroundColor: "#A1D6E2" } }}
      useLegacyImplementation
      initialRouteName="Clients"
    >
      
      <Drawer.Screen name="Clients" component={ClientsStack} />
      <Drawer.Screen name="Products" component={Products} />
    </Drawer.Navigator>
  );
};

export default Menu;
