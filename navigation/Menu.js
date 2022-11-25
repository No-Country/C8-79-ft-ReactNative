import React, { Fragment } from "react";
import {
  createDrawerNavigator,
  DrawerContent,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import Register from "../screens/Register";
import Home from "../screens/Home";
import CustomMenu from "./CustomMenu";
import Products from "../screens/Products";
import Clients from "../screens/Clients";
import { Image, View } from "react-native";
import { Icon } from "@rneui/base";
import Inventario from "../screens/Inventario";
import Reportes from "../screens/Reportes";
import Usuarios from "../screens/Usuarios";
import ClientDetail from "../screens/ClientDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewClient from "../screens/NewClient";
import EditClient from "../screens/EditClient";


const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();



const ClientsStack=()=>{
return <Stack.Navigator
  screenOptions={{
    headerShown: true,
    headerStyle: { backgroundColor: "#A1D6E2" } 
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
        drawerItemStyle: {
           marginVertical:"5%" 
        },
        headerShown: true,
      headerStyle: { backgroundColor: "#A1D6E2" } }}
      useLegacyImplementation
      initialRouteName="Home"
    >
      {/* <ion-icon name="reader"></ion-icon> */}
      <Drawer.Screen
        name="Home"
        
        component={Home}
        options={{
          
          title: "Home",
          drawerIcon: () => <Icon name="home" type="ionicon"></Icon>,
        }}
      />

      <Drawer.Screen
        name="Clients"
        component={ClientsStack}
        options={{
          title: "Clients",
          drawerIcon: () => <Icon name="person" />,
        }}
      />
      <Drawer.Screen
        name="Products"
        component={Products}
        options={{
          title: "Products",
          drawerIcon: () => <Icon name="pricetag" type="ionicon"></Icon>,
        }}
      />

      <Drawer.Screen
        name="Inventario"
        component={Inventario}
        options={{
          title: "Inventario",
          drawerIcon: () => <Icon name="reader" type="ionicon"></Icon>,
        }}
      />

      <Drawer.Screen
        name="Reportes"
        component={Reportes}
        options={{
          title: "Reportes",
          drawerIcon: () => <Icon name="document-text" type="ionicon"></Icon>,
        }}
      />

      <Drawer.Screen
        name="Usuarios"
        component={Usuarios}
        options={{
          title: "Usuarios",
          drawerIcon: () => <Icon name="people" type="ionicon"></Icon>,
        }}
      />
      
      
      
    </Drawer.Navigator>
  );
};

export default Menu;
